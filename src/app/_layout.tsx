import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { pickBy } from 'lodash';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as OpenSansFonts from '@expo-google-fonts/open-sans';
import * as PoppinsFonts from '@expo-google-fonts/poppins';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';

import commonStyles from '../styles/commonStyles';

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
      <SafeAreaView>
        {loaded ? (
          <Slot />
        ) : (
          <View style={[commonStyles.centerBothDirections, commonStyles.fullWH]}>
            <ActivityIndicator animating={true} />
          </View>
        )}
      </SafeAreaView>
    </ThemeProvider>
  );
}
