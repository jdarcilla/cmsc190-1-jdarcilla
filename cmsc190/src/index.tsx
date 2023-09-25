import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/DashboardLayout';
import { userProvider } from './providers/userProvider';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userProvider.user && !userProvider.userData ? (
          <Stack.Screen name="Auth" component={AuthLayout} />
        ) : (
          <Stack.Screen name="Dashboard">
            {props => <DashboardLayout userData={userProvider.userData} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(Main);
