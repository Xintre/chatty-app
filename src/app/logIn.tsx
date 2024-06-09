import * as SecureStore from 'expo-secure-store';
import Button from '@components/design/Button';
import Colors from '@styles/colors';
import Loader from '@components/misc/Loader';
import Screen from '@components/common/Screen';
import SecureStoreKeys from '@constants/SecureStoreKeys';
import Text from '@components/design/Text';
import TextInput from '@components/design/TextInput';
import Toast from 'react-native-root-toast';
import commonStyles from '@styles/commonStyles';
import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { capitalize } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useKeyboard } from '@react-native-community/hooks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMutation } from '@apollo/client';
import { validate } from 'email-validator';

import { LOGIN_USER_MUTATION } from '../graphql/mutations';

export function LoginScreen() {
  const { replace, push } = useRouter();
  const { email = '', password = '' } = useLocalSearchParams<{ email: string; password: string }>();
  const [emailInputValue, setEmailInputValue] = useState(email);
  const [passwordInputValue, setPasswordInputValue] = useState(password);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { keyboardShown } = useKeyboard();

  const [logInUserMutation, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    variables: {
      email: emailInputValue,
      password: passwordInputValue,
    },
    onError(error) {
      if (error.graphQLErrors.length > 0) {
        // Apollo server response returned errors - show the last one
        Alert.alert(
          'Error logging in',
          capitalize((error.graphQLErrors[0] as any).errors ?? error.graphQLErrors[0].message),
        );
      } else {
        // local Apollo error, e.g. network error
        Toast.show('Error logging in' + error.message);
      }

      console.error('Error logging in', error);
    },
    onCompleted(data) {
      Toast.show(`Logged in successfully 🎉`);

      console.log('Logged in successfully', data);

      SecureStore.setItem(SecureStoreKeys.token, data.loginUser.token);

      replace('chats');
    },
  });

  const signUp = useCallback(() => {
    // @ts-ignore next line (bad typings of router)
    replace('signUp');
  }, [replace]);

  const signIn = useCallback(() => {
    logInUserMutation();
  }, [logInUserMutation]);

  const onPasswordVisibilityToggle = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const clearEmailInput = useCallback(() => {
    setEmailInputValue('');
  }, []);

  const emailVaild = useMemo(() => validate(emailInputValue), [emailInputValue]);
  const passwordEmpty = useMemo(() => passwordInputValue.length === 0, [passwordInputValue]);

  const disableButton = useMemo(() => !emailVaild || passwordEmpty, [emailVaild, passwordEmpty]);

  return (
    <Screen
      title="Welcome back"
      subtitle="Log in and stay in touch with everyone!"
      showBackButton={false}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={[commonStyles.section, styles.inputsSection]}>
            <KeyboardAvoidingView>
              <TextInput
                style={{ paddingBottom: 10, paddingHorizontal: 30 }}
                label="e-mail address"
                icon="clear"
                textContentType="emailAddress"
                value={emailInputValue}
                onChangeText={(text) => setEmailInputValue(text)}
                onIconPress={clearEmailInput}
                error={!emailVaild}
                errorText="Email is not valid"
              />
            </KeyboardAvoidingView>

            <KeyboardAvoidingView>
              <TextInput
                style={{ paddingBottom: 10, paddingHorizontal: 30 }}
                label="password"
                icon={passwordVisible ? 'visibility' : 'visibility-off'}
                value={passwordInputValue}
                secureTextEntry={!passwordVisible}
                textContentType="password"
                onChangeText={(text) => setPasswordInputValue(text)}
                alwaysShowIcon
                onIconPress={onPasswordVisibilityToggle}
                error={passwordEmpty}
                errorText="Password cannot be empty"
              />
            </KeyboardAvoidingView>
          </View>

          {!keyboardShown && (
            <View style={[commonStyles.section, styles.buttonsContainer]}>
              <Button
                variant="filled"
                style={styles.button}
                onPress={signIn}
                onLongPress={() => {
                  // @ts-ignore next line (bad typings of router)
                  push('playground');
                }}
                disabled={disableButton}
              >
                Log in
              </Button>

              <View style={styles.signUpContainer}>
                <Text
                  variant="button"
                  style={{ color: Colors.WHITE, marginTop: 13, marginRight: 7 }}
                >
                  Don&apos;t have an account?
                </Text>

                <Button variant="text" onPress={signUp}>
                  Sign up
                </Button>
              </View>
            </View>
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputsSection: {
    flex: 1, // make this inputs section take all available space but two other sections (heading & footer) will take only as much space as they need to live, no less (& no more)
    alignContent: 'flex-start',
  },
  button: {
    margin: 50,
    width: '100%',
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  signUpContainer: {
    width: '100%',
    alignContent: 'space-evenly',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LoginScreen;
