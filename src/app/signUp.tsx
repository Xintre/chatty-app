import * as Linking from 'expo-linking';
import Button from '@components/design/Button';
import Colors from '@styles/colors';
import Loader from '@components/misc/Loader';
import Screen from '@components/common/Screen';
import Text from '@components/design/Text';
import TextInput from '@components/design/TextInput';
import Toast from 'react-native-root-toast';
import commonStyles from '@styles/commonStyles';
import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { capitalize } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useKeyboard } from '@react-native-community/hooks';
import { useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';
import { validate } from 'email-validator';

import { REGISTER_USER_MUTATION } from '../graphql/mutations';

export function SignUpScreen() {
  const { replace } = useRouter();
  const { keyboardShown } = useKeyboard();

  const [emailInputValue, setEmailInputValue] = useState('');
  const [nameInputValue, setNameInputValue] = useState('');
  const [surnameInputValue, setSurnameInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [passwordConfirmationInputValue, setPasswordConfirmationInputValue] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [registerUserMutation, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    variables: {
      email: emailInputValue,
      firstName: nameInputValue,
      lastName: surnameInputValue,
      password: passwordInputValue,
      passwordConfirmation: passwordConfirmationInputValue,
    },
    onError(error) {
      if (error.graphQLErrors.length > 0) {
        // Apollo server response returned errors - show the last one
        Alert.alert(
          'Error registering',
          capitalize((error.graphQLErrors[0] as any).errors ?? error.graphQLErrors[0].message),
        );
      } else {
        // local Apollo error, e.g. network error
        Toast.show('Error registering' + error.message);
      }

      console.error('Error registering', error);
    },
    onCompleted(data) {
      Toast.show(`Registered successfully with ID ${data.registerUser.id} 🎉 Please now log in!`);

      replace({
        pathname: 'logIn',
        params: {
          email: emailInputValue,
          password: passwordInputValue,
        },
      });

      console.log('Registered successfully', data);
    },
  });

  const signIn = useCallback(() => {
    // @ts-ignore next line (bad typings of router)
    replace('logIn');
  }, [replace]);

  const onPasswordVisibilityToggle = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const clearEmailInput = useCallback(() => {
    setEmailInputValue('');
  }, []);

  const clearNameInput = useCallback(() => {
    setNameInputValue('');
  }, []);

  const clearSurnameInput = useCallback(() => {
    setSurnameInputValue('');
  }, []);

  const emailVaild = useMemo(() => validate(emailInputValue), [emailInputValue]);
  const passwordTooShort = useMemo(() => passwordInputValue.length < 8, [passwordInputValue]);
  const passwordConfirmationTooShort = useMemo(
    () => passwordConfirmationInputValue.length < 8,
    [passwordConfirmationInputValue],
  );
  const passwordConfirmationDoesNotMatch = useMemo(
    () => passwordInputValue !== passwordConfirmationInputValue,
    [passwordInputValue, passwordConfirmationInputValue],
  );
  const nameEmpty = useMemo(() => nameInputValue.length === 0, [nameInputValue]);
  const surnameEmpty = useMemo(() => surnameInputValue.length === 0, [surnameInputValue]);

  const disableButton = useMemo(
    () =>
      !emailVaild ||
      passwordTooShort ||
      passwordConfirmationTooShort ||
      passwordConfirmationDoesNotMatch ||
      nameEmpty ||
      surnameEmpty,
    [
      emailVaild,
      passwordTooShort,
      passwordConfirmationTooShort,
      passwordConfirmationDoesNotMatch,
      nameEmpty,
      surnameEmpty,
    ],
  );

  const signUp = useCallback(() => {
    registerUserMutation();
  }, [registerUserMutation]);

  return (
    <Screen title="Create account" showBackButton={false} backgroundColor={Colors.BLUE300}>
      {loading ? (
        <Loader />
      ) : (
        <>
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
              label="first name"
              icon="clear"
              textContentType="givenName"
              value={nameInputValue}
              onChangeText={(text) => setNameInputValue(text)}
              onIconPress={clearNameInput}
              error={nameEmpty}
              errorText="Name cannot be empty"
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView>
            <TextInput
              style={{ paddingBottom: 10, paddingHorizontal: 30 }}
              label="last name"
              icon="clear"
              textContentType="middleName"
              value={surnameInputValue}
              onChangeText={(text) => setSurnameInputValue(text)}
              onIconPress={clearSurnameInput}
              error={surnameEmpty}
              errorText="Surname cannot be empty"
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView>
            <TextInput
              style={{ paddingBottom: 10, paddingHorizontal: 30 }}
              label="password"
              icon={passwordVisible ? 'visibility' : 'visibility-off'}
              value={passwordInputValue}
              secureTextEntry={!passwordVisible}
              textContentType="newPassword"
              onChangeText={(text) => setPasswordInputValue(text)}
              alwaysShowIcon
              onIconPress={onPasswordVisibilityToggle}
              error={passwordTooShort}
              errorText="Password should be at least 8 characters long"
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView>
            <TextInput
              style={{ paddingBottom: 10, paddingHorizontal: 30 }}
              label="password confirmation"
              icon={passwordVisible ? 'visibility' : 'visibility-off'}
              value={passwordConfirmationInputValue}
              secureTextEntry={!passwordVisible}
              textContentType="newPassword"
              onChangeText={(text) => setPasswordConfirmationInputValue(text)}
              alwaysShowIcon
              onIconPress={onPasswordVisibilityToggle}
              error={passwordConfirmationTooShort || passwordConfirmationDoesNotMatch}
              errorText={
                passwordConfirmationTooShort
                  ? 'Password should be at least 8 characters long'
                  : 'Passwords do not match'
              }
            />
          </KeyboardAvoidingView>

          {!keyboardShown && (
            <View style={[commonStyles.section, styles.buttonsContainer]}>
              <Button disabled={disableButton} variant="filled" onPress={signUp}>
                Sign up
              </Button>

              <Text variant="caption" style={styles.rulesText}>
                By signing up, you agree with{' '}
                <Text
                  variant="caption"
                  style={commonStyles.link}
                  onPress={() => {
                    Linking.openURL('https://google.com');
                  }}
                >
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text
                  variant="caption"
                  style={commonStyles.link}
                  onPress={() => {
                    Linking.openURL('https://github.com');
                  }}
                >
                  Privacy Policy
                </Text>
              </Text>

              <View style={styles.signInContainer}>
                <Text
                  variant="button"
                  style={{ color: Colors.WHITE, marginTop: 13, marginRight: 7 }}
                >
                  Already have an account?
                </Text>

                <Button variant="text" onPress={signIn}>
                  Log in
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
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  signInContainer: {
    width: '100%',
    alignContent: 'space-evenly',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  rulesText: {
    color: Colors.WHITE,
    marginTop: 16,
  },
});

export default SignUpScreen;
