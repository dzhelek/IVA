import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useRouter } from "expo-router";

import axios from "axios";

import Button from "@/components/Button";
import VoteButton from '@/components/VoteButton';
import { ELECTION_SERVER } from "@/constants/Default";

export default function Ballot() {
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<Array<{id: number, name: string}>>([]);
  const [vote, setVote] = useState<number>(0);

  const router = useRouter();

  const fetchData = async () => {
    try {
        const response = await axios.get(ELECTION_SERVER + '/get-parties');
        setList(response.data);
    }catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

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
      <Button label="Гласувай" action={() => router.replace({pathname: "/vote"})} icon="vote" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 19,
  },
  textbox: {
    // height: '50%',
    // width: '80%',
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