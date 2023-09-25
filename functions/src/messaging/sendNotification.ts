import * as admin from "firebase-admin";
import { repo } from "../repo";

export const sendGoalNotification = async () => {
  const users = await repo.users.listAllValues_UNSAFE();

  const tokens = users.reduce<string[]>((arr, user) => {
    if (user.notificationEnabled && user.fcmToken) {
      return [...arr, user.fcmToken];
    }
    return arr;
  }, []);

  await admin.messaging().sendEachForMulticast({
    tokens,
    data: {
      notifee: JSON.stringify({
        title: "Goal Update",
        // eslint-disable-next-line max-len
        body: "Your goal for today is incomplete. Challenges happen. Reflect, adjust, and stay focused for a successful tomorrow.",
        android: {
          channelId: "goal-reminder",
          smallIcon: "ic_small_icon",
          color: "#00639a",
        },
      }),
    },
  });
};

export const sendTestNotification = async () => {
  const users = await repo.users.listAllValues_UNSAFE();

  const tokens = users.reduce<string[]>((arr, user) => {
    if (user.notificationEnabled && user.fcmToken) {
      return [...arr, user.fcmToken];
    }
    return arr;
  }, []);

  await admin.messaging().sendEachForMulticast({
    tokens,
    data: {
      notifee: JSON.stringify({
        title: "Test Reminder",
        // eslint-disable-next-line max-len
        body: "Don't forget to take your test today. Time to see your progress!",
        android: {
          channelId: "test-reminder",
          smallIcon: "ic_small_icon",
          color: "#00639a",
        },
      }),
    },
  });
};
