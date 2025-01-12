import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import axios from "axios";
import forge from 'node-forge';

import Button from "@/components/Button";
import VoteButton from '@/components/VoteButton';
import { ELECTION_SERVER } from "@/constants/Default";
import { useCertificate } from "@/app/_layout";

export default function Ballot() {
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<Array<{id: number, name: string}>>([]);
  const [vote, setVote] = useState<number>(0);

  const {certificate} = useCertificate();

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [])

  const cert = certificate.cert;
  const privkey = certificate.privkey;

  const fetchData = async () => {
    try {
        const response = await axios.get(ELECTION_SERVER + '/get-parties');
        setList(response.data);
    }catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }

  const processVote = async () => {
    const md = forge.md.sha512.create();
    md.update(vote.toString(), 'utf8');

    let code = 400;

    try {
      const response = await axios.post(ELECTION_SERVER + '/vote', {
        vote: vote.toString(), cert: forge.pki.certificateToPem(cert), signature: forge.util.encode64(privkey.sign(md))
      })
      code = response.status;
    }
    catch(error) {
      console.error('Error submitting vote: ', error);
    }

    router.replace({pathname: "/vote", params: {code: code}});
  }

  return (
    <View style={styles.container}>
      { loading ? <ActivityIndicator size='large' color='#ffd33d'/> :
      <View style={styles.textbox}>
        <Text style={styles.title}>Изберете партия:</Text>
        {/* <ScrollView> */}
            { list.map((item) =>
                <VoteButton key={item.id} id={item.id} label={item.name} selected={vote == item.id} setChoice={setVote}/>
            )}
        {/* </ScrollView> */}
      </View>
      }
      <Button icon="vote" label="Гласувай" action={() => {
        if (vote) {
          setLoading(true);
          processVote();
        }
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    padding: 19,
  },
  textbox: {
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    color:  '#ffd33d',
    textAlign: 'center',
    margin: 30,
  }
});