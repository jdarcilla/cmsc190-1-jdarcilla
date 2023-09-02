export type UserKey = { uid: string };
export type JournalEntryKey = UserKey & { journalEntryId: string };
export type TaskKey = UserKey & { taskId: string };
export type RewardKey = UserKey & { rewardId: string };
export type MeditationStatKey = UserKey & { meditationStatId: string };
