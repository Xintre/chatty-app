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

export function LoginScreen() {
  const { replace } = useRouter();
  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { keyboardShown } = useKeyboard();

  const signUp = useCallback(() => {
    // @ts-ignore next line (bad typings of router)
    replace('signUp');
  }, [replace]);

  const signIn = useCallback(() => {}, []);

  const onPasswordVisibilityToggle = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const clearEmailInput = useCallback(() => {
    setEmailInputValue('');
  }, []);

  return (
    <Screen
      title="Welcome back"
      subtitle="Log in and stay in touch with everyone!"
      showBackButton={false}
    >
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
      </KeyboardAvoidingView>

      {!keyboardShown && (
        <View style={[commonStyles.section, styles.buttonsContainer]}>
          <Button
            variant="filled"
            style={styles.button}
            onPress={signIn}
            onLongPress={() => {
              // @ts-ignore next line (bad typings of router)
              navigate('playground');
            }}
          >
            Log in
          </Button>

          <View style={styles.signUpContainer}>
            <Text variant="button" style={{ color: Colors.WHITE, marginTop: 13, marginRight: 7 }}>
              Don&apos;t have an account?
            </Text>

            <Button variant="text" onPress={signUp}>
              Sign up
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
  signUpContainer: {
    width: '100%',
    alignContent: 'space-evenly',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LoginScreen;
