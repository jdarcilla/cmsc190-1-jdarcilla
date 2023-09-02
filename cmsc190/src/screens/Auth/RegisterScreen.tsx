import auth from '@react-native-firebase/auth';
import { validate } from 'nutso';
import React, { memo, useState } from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../../components/BackButton';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import TextInput from '../../components/TextInput';
import { emailSchema } from '../../core/schema/emailSchema';
import { nameSchema } from '../../core/schema/nameSchema';
import { passwordSchema } from '../../core/schema/passwordSchema';
import { theme } from '../../core/theme';
import { userProvider } from '../../providers/userProvider';
import { Navigation } from '../../types';

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nameValidation = validate(name, nameSchema);
  const emailValidation = validate(email, emailSchema);
  const passwordValidation = validate(password, passwordSchema);

  const _onSignUpPressed = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth()
          .currentUser?.updateProfile({ displayName: name })
          .then(() => {
            userProvider.login(auth().currentUser);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') ToastAndroid.show('That email address is already in use!',ToastAndroid.SHORT); // prettier-ignore
        if (error.code === 'auth/invalid-email') ToastAndroid.show('That email address is invalid!',ToastAndroid.SHORT); // prettier-ignore
        console.error(error);
      });
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header style={{ color: theme.colors.onPrimary }}>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name}
        onChangeText={(text: string) => setName(text)}
        error={!nameValidation.isValid}
        validation={nameValidation}
        accessibilityLabelledBy={undefined}
        accessibilityLanguage={undefined}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        error={!emailValidation.isValid}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        validation={emailValidation}
        accessibilityLabelledBy={undefined}
        accessibilityLanguage={undefined}
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        error={!passwordValidation.isValid}
        validation={passwordValidation}
        accessibilityLabelledBy={undefined}
        accessibilityLanguage={undefined}
        secureTextEntry
      />

      <Button
        mode="contained"
        buttonColor={theme.colors.surface}
        textColor={theme.colors.primary}
        onPress={_onSignUpPressed}
        style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.onPrimary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.inversePrimary,
  },
});

export default memo(RegisterScreen);
