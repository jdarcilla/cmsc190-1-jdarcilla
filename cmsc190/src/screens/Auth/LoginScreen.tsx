import auth from '@react-native-firebase/auth';
import { emailSchema, passwordSchema, theme } from 'core';
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
import { Navigation } from '../../types';

type Props = {
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailValidation = validate(email, emailSchema);
  const passwordValidation = validate(password, passwordSchema);

  const _onLoginPressed = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user =>
        ToastAndroid.show('Successfully signed in.', ToastAndroid.SHORT)
      )
      .catch(error => {
        if (error.code === 'auth/wrong-password')
          ToastAndroid.show('Invalid password.', ToastAndroid.SHORT);
        if (error.code === 'auth/invalid-email')
          ToastAndroid.show('Invalid email.', ToastAndroid.SHORT);
        console.error(error);
      });
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header style={{ color: theme.colors.onPrimary }}>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        error={!emailValidation.isValid}
        validation={emailValidation}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        error={!passwordValidation.isValid}
        validation={passwordValidation}
        secureTextEntry
      />

      <Button
        mode="contained"
        buttonColor={theme.colors.surface}
        textColor={theme.colors.primary}
        style={styles.button}
        disabled={!emailValidation.isValid || !passwordValidation.isValid}
        onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
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

export default memo(LoginScreen);
