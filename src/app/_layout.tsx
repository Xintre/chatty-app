import 'react-native-reanimated';

import * as OpenSansFonts from '@expo-google-fonts/open-sans';
import * as PoppinsFonts from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import Loader from '@components/misc/Loader';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import { pickBy } from 'lodash';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    ...pickBy(OpenSansFonts, (_value, key) => key.startsWith('OpenSans')),
    ...pickBy(PoppinsFonts, (_value, key) => key.startsWith('Poppins')),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaView style={{ flex: 1 }}>{loaded ? <Slot /> : <Loader />}</SafeAreaView>
    </ThemeProvider>
  );
}
