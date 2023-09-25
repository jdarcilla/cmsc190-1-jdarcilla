import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import messaging from '@react-native-firebase/messaging';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { repo } from 'client';
import { User, theme } from 'core';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { IResource } from 'mobx-utils';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalContainer from '../components/ModalContainer';
import DiaryScreen from '../screens/Dashboard/DiaryScreen';
import ProfileScreen from '../screens/Dashboard/ProfileScreen';
import ProgressScreen from '../screens/Dashboard/ProgressScreen';

const Tab = createBottomTabNavigator();

type Props = {
  userData: IResource<User | null | undefined> | undefined;
};

const DashboardLayout = ({ userData }: Props) => {
  useEffect(() => {
    const disposer = autorun(() => {
      getToken();
    });

    return () => disposer();
  });

  const getToken = async () => {
    const $userData = userData?.current();
    if (!$userData) return null;

    const oldToken = $userData.fcmToken;
    const fcmToken = await messaging().getToken();

    if (oldToken !== fcmToken) {
      await repo.user.update($userData, { fcmToken });
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarStyle: {
              height: 60,
              position: 'absolute',
              bottom: 25,
              left: 20,
              right: 20,
              borderRadius: 15,
              shadowColor: 'black',
              shadowOpacity: 1,
              shadowRadius: 1,
              shadowOffset: {
                width: 0,
                height: 12,
              },
              elevation: 24,
            },
            headerShown: false,
          }}>
          <Tab.Screen
            name="Home"
            component={DiaryScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="book-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Progress"
            component={ProgressScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="chart-bar"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
        <ModalContainer />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default observer(DashboardLayout);
