import * as Linking from 'expo-linking';
import Button from '@components/design/Button';
import Colors from '@styles/colors';
import Screen from '@components/common/Screen';
import Text from '@components/design/Text';
import TextInput from '@components/design/TextInput';
import commonStyles from '@styles/commonStyles';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useCallback, useState } from 'react';
import { useKeyboard } from '@react-native-community/hooks';
import { useRouter } from 'expo-router';

export function SignUpScreen() {
  const { replace } = useRouter();
  const { keyboardShown } = useKeyboard();

  const [emailInputValue, setEmailInputValue] = useState('');
  const [nameInputValue, setNameInputValue] = useState('');
  const [surnameInputValue, setSurnameInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [passwordConfirmationInputValue, setPasswordConfirmationInputValue] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const signUp = useCallback(() => {}, []);

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

  return (
    <Screen title="Create account" showBackButton={false}>
      <KeyboardAvoidingView style={[commonStyles.section, styles.inputsSection]}>
        <TextInput
          style={{ paddingBottom: 10, paddingHorizontal: 30 }}
          label="e-mail address"
          icon="clear"
          textContentType="emailAddress"
          value={emailInputValue}
          onChangeText={(text) => setEmailInputValue(text)}
          onIconPress={clearEmailInput}
        />

        <TextInput
          style={{ paddingBottom: 10, paddingHorizontal: 30 }}
          label="first name"
          icon="clear"
          textContentType="givenName"
          value={nameInputValue}
          onChangeText={(text) => setNameInputValue(text)}
          onIconPress={clearNameInput}
        />

        <TextInput
          style={{ paddingBottom: 10, paddingHorizontal: 30 }}
          label="last name"
          icon="clear"
          textContentType="middleName"
          value={surnameInputValue}
          onChangeText={(text) => setSurnameInputValue(text)}
          onIconPress={clearSurnameInput}
        />

        <TextInput
          style={{ paddingBottom: 10, paddingHorizontal: 30 }}
          label="password"
          icon={passwordVisible ? 'visibility' : 'visibility-off'}
          value={passwordInputValue}
          secureTextEntry={!passwordVisible}
          keyboardType="visible-password"
          textContentType="password"
          onChangeText={(text) => setPasswordInputValue(text)}
          alwaysShowIcon
          onIconPress={onPasswordVisibilityToggle}
        />

        <TextInput
          style={{ paddingBottom: 10, paddingHorizontal: 30 }}
          label="password"
          icon={passwordVisible ? 'visibility' : 'visibility-off'}
          value={passwordConfirmationInputValue}
          secureTextEntry={!passwordVisible}
          keyboardType="visible-password"
          textContentType="password"
          onChangeText={(text) => setPasswordConfirmationInputValue(text)}
          alwaysShowIcon
          onIconPress={onPasswordVisibilityToggle}
        />
      </KeyboardAvoidingView>

      {!keyboardShown && (
        <View style={[commonStyles.section, styles.buttonsContainer]}>
          <Button variant="filled" style={styles.button} onPress={signUp}>
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
            <Text variant="button" style={{ color: Colors.WHITE, marginTop: 13, marginRight: 7 }}>
              Already have an account?
            </Text>

            <Button variant="text" onPress={signIn}>
              Log in
            </Button>
          </View>
        </View>
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
