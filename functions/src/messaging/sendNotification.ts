/* eslint-disable arrow-parens */
/* eslint-disable max-len */
import * as admin from "firebase-admin";
import {repo} from "../repo";

export const sendGoalNotification = async () => {
  const users = await repo.users.listAllValues_UNSAFE();

  let tokens: string[] = [];

  for (const user of users) {
    if (!user.notificationEnabled) continue;

    if (!user.fcmToken) continue;

    if (!user.goals) continue;

    const $journalEntries = repo.journalEntries.listAllValues_UNSAFE(user);
    const $tasks = repo.tasks.listAllValues_UNSAFE(user);
    const $meditations = repo.meditationStats.listAllValues_UNSAFE(user);

    const [journalEntries, tasks, meditations] = await Promise.all([
      $journalEntries,
      $tasks,
      $meditations,
    ]);

    if (
      (user.goals.journalEntries ?? 0) !==
      journalEntries.filter(
        (entry) =>
          new Date(entry.createdIsoDateUtc).toDateString() >
          new Date().toDateString()
      ).length
    ) {
      tokens = [...tokens, user.fcmToken];
      continue;
    }

    if (
      (user.goals.meditationsDone ?? 0) !==
      meditations.filter(
        (meditation) =>
          new Date(meditation.createdIsoDateUtc).toDateString() >
          new Date().toDateString()
      ).length
    ) {
      tokens = [...tokens, user.fcmToken];
      continue;
    }

    if (
      (user.goals.tasksCompleted ?? 0) !==
      tasks.filter(
        (task) =>
          new Date(task.createdIsoDateUtc).toDateString() >
            new Date().toDateString() && task.isDone
      ).length
    ) {
      tokens = [...tokens, user.fcmToken];
      continue;
    }
  }

  await admin.messaging().sendEachForMulticast({
    tokens,
    data: {
      notifee: JSON.stringify({
        title: "Goal Update",
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
