import 'react-native-reanimated';

import * as OpenSansFonts from '@expo-google-fonts/open-sans';
import * as PoppinsFonts from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import Colors from '@styles/colors';
import Loader from '@components/misc/Loader';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { AuthContextProvider, AuthContextType, defaultAuthContext } from '@context/AuthContext';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import { pickBy } from 'lodash';
import { setContext } from '@apollo/client/link/context';
import { useEffect, useMemo, useState } from 'react';
import { useFonts } from 'expo-font';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [authContext, setAuthContext] = useState<AuthContextType>(defaultAuthContext);

  const [loaded] = useFonts({
    ...pickBy(OpenSansFonts, (_value, key) => key.startsWith('OpenSans')),
    ...pickBy(PoppinsFonts, (_value, key) => key.startsWith('Poppins')),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const apolloClient = useMemo(() => {
    const httpLink = createHttpLink({
      uri: 'https://chat.thewidlarzgroup.com/api/graphiql',
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: authContext.token ? `Bearer ${authContext.token}` : '',
        },
      };
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network', // first ask cache, in the background check with server if up-to-date
        },
      },
    });
  }, [authContext.token]);

  return (
    <ThemeProvider value={DefaultTheme}>
      <RootSiblingParent>
        <ApolloProvider client={apolloClient}>
          <AuthContextProvider
            value={{
              ...authContext,
              setToken(token) {
                setAuthContext({
                  ...authContext,
                  token,
                });
              },
            }}
          >
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BLUE300 }}>
              {loaded ? <Slot /> : <Loader />}
            </SafeAreaView>
          </AuthContextProvider>
        </ApolloProvider>
      </RootSiblingParent>
    </ThemeProvider>
  );
}
