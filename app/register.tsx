import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert, ActivityIndicator} from "react-native";
import { useRouter } from "expo-router";

import axios from 'axios';
import forge from 'node-forge';

import Button from "@/components/Button";
import { ELECTION_SERVER } from "@/constants/Default";
import { useCertificate } from "@/app/_layout";

export default function Register() {
  const [ssn, setSsn] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {setCertificate} = useCertificate();

  const validateSsn = () => {
    if (ssn.search(/^\d{10}$/) != 0) {
      return false;
    }
    let sum = 0;
    Array.from(ssn.substring(0,9)).forEach((digit, index) => {
      sum += 2**(index+1)%11*parseInt(digit);
    })
    return sum%11%10 == parseInt(ssn.substring(9));
  };

  const processEID = async () => {
    forge.pki.rsa.generateKeyPair({bits: 1024}, async (err: Error, keys: forge.pki.rsa.KeyPair) => {
      if (err) {
        console.error('Error generating key pair');
        return;
      }

      const csr = forge.pki.createCertificationRequest();
      csr.publicKey = keys.publicKey;
      csr.setSubject([
        {name: 'commonName', value: 'IVA'},
        {name: 'countryName', value: 'BG'},
      ])
      csr.addAttribute({name: 'subjectKeyIdentifier', value: ssn});
      csr.sign(keys.privateKey);

      try {
        const response = await axios.post(ELECTION_SERVER + "/log-in", {csr: forge.pki.certificationRequestToPem(csr)});
        setCertificate({privkey: keys.privateKey, cert: forge.pki.certificateFromPem(response.data.cert)});
      } catch (error) {
        console.error('Error fetching data:', error);
        return;
      }

      router.replace({pathname: '/ballot'});
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textbox}> 
        <Text style={styles.text}>
За да продължите с гласуването, трябва да имате регистрация в Evrotrust.
Ако нямате такава, първо създайте акаунт в Evrotrust, след което се върнете тук и влезте с Evrotrust eID.
        </Text>
      </View>
      <TextInput
        autoFocus
        style={styles.inputbox}
        placeholder="Въведи ЕГН"
        keyboardType="numeric"
        onChangeText={setSsn}
        maxLength={10}
      />
      <Button label="Влез с Evrotrust eID" icon="login" action={() =>{
        setLoading(true);
        if (validateSsn()) processEID();
        else {
          setLoading(false);
          Alert.alert('Грешно ЕГН', 'Моля въведете правилно своето ЕГН.', [{text: 'OK'}]);
        }
      }}/>
      { loading && <ActivityIndicator size='large' color='#ffd33d'/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textbox: {
    width: '80%',
    margin: 50,
  },
  inputbox: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    fontSize: 16,
    textAlign: 'center',
    
    borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18,
    backgroundColor: '#fff'
  },
  inputlabel: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});