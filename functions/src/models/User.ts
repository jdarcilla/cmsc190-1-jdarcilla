export type User = {
  uid: string;
  fcmToken?: string;
  notificationEnabled?: boolean;
  goals?: Goals;
};

export type Goals = {
  journalEntries?: number;
  tasksCompleted?: number;
  meditationsDone?: number;
};
