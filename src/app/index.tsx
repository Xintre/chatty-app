import Loader from '@components/misc/Loader';
import { useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';

export default function Home() {
  const { replace } = useRouter();

  useFocusEffect(
    useCallback(() => {
      replace('logIn');
    }, [replace]),
  );

  return <Loader />;
}
