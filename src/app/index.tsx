import * as SecureStore from 'expo-secure-store';
import Loader from '@components/misc/Loader';
import SecureStoreKeys from '@constants/SecureStoreKeys';
import useAuthContext from '@hooks/useAuthContext';
import { useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';

export default function Entrypoint() {
  const { replace } = useRouter();
  const authContext = useAuthContext();

  useFocusEffect(
    useCallback(() => {
      const rememberedToken = SecureStore.getItem(SecureStoreKeys.token) ?? null;

      console.log(`Loaded remembered token from SecureStore: ${rememberedToken}`);

      if (rememberedToken === null) {
        console.log('Null loaded, showing sign up');
        replace('signUp');
      } else {
        console.log('Not null loaded, showing chats');

        authContext.setToken(rememberedToken);

        replace('chats');
      }
    }, [replace, authContext]),
  );

  return <Loader />;
}
