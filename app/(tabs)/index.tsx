import { Text, View, StyleSheet, Alert } from "react-native";

import Button from "@/components/Button"
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.textbox}>
        <Text style={styles.title}>
          Добре Дошли!
        </Text>
        <Text style={styles.text}>
          Това е прототип на система за електронно гласуване чрез мобилно приложение.
        </Text>
      </View>
      <Button label="Гласувай" action={() => router.push({pathname: "/register"})} icon="checkbox-marked-outline" />
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
    height: '50%',
    width: '80%',
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
    margin: 50,
  }
});