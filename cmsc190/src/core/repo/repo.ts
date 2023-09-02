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
import { firestorePaths } from '../paths/firestorePaths';
import { CollectionRepo } from './CollectionRepo';
import { DocumentRepo } from './DocumentRepo';

export const repo = {
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
