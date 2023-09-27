/* eslint-disable max-len */

import {JournalEntry} from "../models/JournalEntry";
import {UserKey} from "../models/Keys";
import {MeditationStat, Stats} from "../models/Stats";
import {Task} from "../models/Task";
import {User} from "../models/User";
import {FirestorePath} from "./FirestorePath";

const users = new FirestorePath<void, void>("users");
const user = new FirestorePath<UserKey, User>(`${users.template}/{uid}`);

const stats = new FirestorePath<UserKey, Stats>(`${user.template}/stats/data`);

const journalEntries = new FirestorePath<UserKey, JournalEntry>(`${user.template}/journal_entries`);
const tasks = new FirestorePath<UserKey, Task>(`${user.template}/tasks`);
const meditationStats = new FirestorePath<UserKey, MeditationStat>(`${user.template}/meditation_stats`);

export const firestorePaths = {
  users,
  user,
  stats,
  journalEntries,
  tasks,
  meditationStats,
};
