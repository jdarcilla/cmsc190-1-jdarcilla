import {UserKey} from "../models/Keys";
import {Stats} from "../models/Stats";
import {User} from "../models/User";
import {firestorePaths} from "../paths/firestorePaths";
import {CollectionRepo} from "./CollectionRepo";
import {DocumentRepo} from "./DocumentRepo";

export const repo = {
  users: new CollectionRepo<void, User>(firestorePaths.users),
  user: new DocumentRepo<UserKey, User>(firestorePaths.user),
  stats: new DocumentRepo<UserKey, Stats>(firestorePaths.stats),
};
