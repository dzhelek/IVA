import { Text, View, StyleSheet, Alert } from "react-native";

import Button from "@/components/Button"
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <Text style={styles.title}>
            Вашият глас беше преброен!
        </Text>
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
//   textbox: {
//     height: '50%',
//     width: '80%',
//     justifyContent: 'center',
//   },
  title: {
    fontSize: 30,
    color:  '#ffd33d',
    textAlign: 'center',
    margin: 50,
  }
});