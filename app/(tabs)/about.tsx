import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Системата за електронно гласуване се състои от множество компоненти, които се интегрират, за да изградят необходимите ѝ функционалности. Първият компонент е мобилното приложение, което има няколко функции</Text>
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
  text: {
    color: '#fff',
    fontSize: 20,
  },
});