/* eslint-disable max-len */
import {JournalEntry} from "../models/JournalEntry";
import {UserKey} from "../models/Keys";
import {MeditationStat, Stats} from "../models/Stats";
import {Task} from "../models/Task";
import {User} from "../models/User";
import {firestorePaths} from "../paths/firestorePaths";
import {CollectionRepo} from "./CollectionRepo";
import {DocumentRepo} from "./DocumentRepo";

export const repo = {
  users: new CollectionRepo<void, User>(firestorePaths.users),
  user: new DocumentRepo<UserKey, User>(firestorePaths.user),
  stats: new DocumentRepo<UserKey, Stats>(firestorePaths.stats),
  journalEntries: new CollectionRepo<UserKey, JournalEntry>(firestorePaths.journalEntries),
  tasks: new CollectionRepo<UserKey, Task>(firestorePaths.tasks),
  meditationStats: new CollectionRepo<UserKey, MeditationStat>(firestorePaths.meditationStats),
};
