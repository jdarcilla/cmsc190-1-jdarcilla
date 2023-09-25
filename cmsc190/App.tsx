import notifee, { Event, EventType } from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { theme } from 'core';
import React, { useEffect } from 'react';
import { Provider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import App from './src';

const cancelNotification = async ({ type, detail }: Event) => {
  const { notification, channel } = detail;

  if (!notification?.id) return;

  if (type === EventType.APP_BLOCKED) {
    await notifee.cancelNotification(notification.id);
  }

  if (type === EventType.CHANNEL_BLOCKED) {
    if (!channel?.id || !notification?.android?.channelId) return;
    if (channel.id !== notification.android.channelId) return;
    await notifee.cancelNotification(notification.id);
  }
};

const showNotification = async (
  message: FirebaseMessagingTypes.RemoteMessage
) => {
  // Create channel (required for Android)
  await notifee.createChannel({
    id: 'goal-reminder',
    name: 'Goal Reminder',
  });

  await notifee.createChannel({
    id: 'test-reminder',
    name: 'Test Reminder',
  });

  if (!message.data) return;

  // Dispay notification (channelId is also passed from fcm)
  notifee.displayNotification(JSON.parse(message.data.notifee));
};

// handle permission changes
notifee.onForegroundEvent(cancelNotification);
notifee.onBackgroundEvent(cancelNotification);

// handle notifications sent from fcm
messaging().onMessage(showNotification);
messaging().setBackgroundMessageHandler(showNotification);

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
