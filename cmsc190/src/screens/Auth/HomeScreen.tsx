import { theme } from 'core';
import React, { memo } from 'react';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import Paragraph from '../../components/Paragraph';
import { Navigation } from '../../types';

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header style={{ color: theme.colors.onPrimary }}>Thrive</Header>

    <Paragraph style={{ color: theme.colors.onPrimary, marginBottom: 20 }}>
      CBT app to manage your mental health.
    </Paragraph>
    <Button
      mode="contained"
      buttonColor={theme.colors.surface}
      textColor={theme.colors.primary}
      onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      style={{ borderColor: theme.colors.onPrimary }}
      textColor={theme.colors.onPrimary}
      onPress={() => navigation.navigate('RegisterScreen')}>
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
