import { Stack } from "expo-router";

export default function RootLayout() {
    return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ presentation: 'modal', title: 'Регистриране'}} />
      <Stack.Screen name="ballot" options={{ presentation: 'modal', title: 'Електронна бюлетина'}} />
      <Stack.Screen name="vote" options={{ presentation: 'modal', headerShown: false}} />
      {/* <Stack.Screen name="+not-found" /> */}
    </Stack>
  );
}
