import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Stack } from "expo-router";

interface GlobalContextType {
  certificate: any;
  setCertificate: Dispatch<SetStateAction<Object>>;
}

const GlobalContext = createContext<GlobalContextType>({certificate: {}, setCertificate: () => undefined});

export default function RootLayout() {
  const [certificate, setCertificate] = useState<Object>({});

  return (
    <GlobalContext.Provider value={{certificate, setCertificate}}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ presentation: 'modal', title: 'Регистриране'}} />
        <Stack.Screen name="ballot" options={{ presentation: 'modal', title: 'Електронна бюлетина'}} />
        <Stack.Screen name="vote" options={{ presentation: 'modal', headerShown: false}} />
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
    </GlobalContext.Provider>
  );
}

export const useCertificate = () => {
  return useContext(GlobalContext);
}