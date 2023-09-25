import {
  JournalEntry,
  JournalEntryKey,
  MeditationStat,
  MeditationStatKey,
  Reward,
  RewardKey,
  Stats,
  Task,
  TaskKey,
  User,
  UserKey,
  firestorePaths,
} from "core";
import { CollectionRepo } from "./CollectionRepo";
import { DocumentRepo } from "./DocumentRepo";

export const repo = {
  users: new CollectionRepo<void, User>(firestorePaths.users),
  user: new DocumentRepo<UserKey, User>(firestorePaths.user),
  stats: new DocumentRepo<UserKey, Stats>(firestorePaths.stats),
  journalEntries: new CollectionRepo<UserKey, JournalEntry>(firestorePaths.journalEntries), // prettier-ignore
  journalEntry: new DocumentRepo<JournalEntryKey, JournalEntry>(firestorePaths.journalEntry), // prettier-ignore
  tasks: new CollectionRepo<UserKey, Task>(firestorePaths.tasks),
  task: new DocumentRepo<TaskKey, Task>(firestorePaths.task),
  rewards: new CollectionRepo<UserKey, Reward>(firestorePaths.rewards),
  reward: new DocumentRepo<RewardKey, Reward>(firestorePaths.reward),
  meditationStats: new CollectionRepo<UserKey, MeditationStat>(firestorePaths.meditationStats), // prettier-ignore
  meditationStat: new DocumentRepo<MeditationStatKey, MeditationStat>(firestorePaths.meditationStat), // prettier-ignore
};
