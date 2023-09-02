import { JournalEntry } from '../models/JournalEntry';
import {
  JournalEntryKey,
  MeditationStatKey,
  RewardKey,
  TaskKey,
  UserKey,
} from '../models/Keys';
import { Reward } from '../models/Reward';
import { MeditationStat, Stats } from '../models/Stats';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { FirestorePath } from './FirestorePath';

const users = new FirestorePath<void, void>('users');
const user = new FirestorePath<UserKey, User>(`${users.template}/{uid}`);

const stats = new FirestorePath<UserKey, Stats>(`${user.template}/stats/data`);

const journalEntries = new FirestorePath<UserKey, JournalEntry>(`${user.template}/journal_entries`) // prettier-ignore
const journalEntry = new FirestorePath<JournalEntryKey, JournalEntry>(`${journalEntries.template}/{journalEntryId}`) // prettier-ignore

const tasks = new FirestorePath<UserKey, Task>(`${user.template}/tasks`);
const task = new FirestorePath<TaskKey, Task>(`${tasks.template}/{taskId}`);

const rewards = new FirestorePath<UserKey, Reward>(`${user.template}/rewards`);
const reward = new FirestorePath<RewardKey, Reward>(`${rewards.template}/{rewardId}`) // prettier-ignore

const meditationStats = new FirestorePath<UserKey, MeditationStat>(`${user.template}/meditation_stats`); // prettier-ignore
const meditationStat = new FirestorePath<MeditationStatKey, MeditationStat>(`${meditationStats.template}/{meditationStatId}`) // prettier-ignore

export const firestorePaths = {
  users,
  user,
  stats,
  journalEntries,
  journalEntry,
  tasks,
  task,
  rewards,
  reward,
  meditationStats,
  meditationStat,
};
