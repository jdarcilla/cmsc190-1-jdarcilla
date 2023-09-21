import { theme } from 'core';
import React, { useEffect } from 'react';
import { Provider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import App from './src';

const Main = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider theme={theme}>
      <App />
    </Provider>
  );
};

export default Main;
