import { Text, View, StyleSheet, Alert } from "react-native";
import { useGlobalSearchParams } from "expo-router";

export default function Index() {
  const {code} = useGlobalSearchParams();

  let text;

  switch(code){
    case "200": 
      text = "Вашият глас беше преброен!";
      break;
    case "204":
      text = "Вие вече сте гласували! Нямате право на повторно гласуване.";
      break;
    default:
      text = "Възникна грешка!";
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          {text}
        </Text>
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
  title: {
    fontSize: 30,
    color:  '#ffd33d',
    textAlign: 'center',
    margin: 50,
  }
});