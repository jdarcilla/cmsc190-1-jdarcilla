
import {UserKey} from "../models/Keys";
import {Stats} from "../models/Stats";
import {User} from "../models/User";
import {FirestorePath} from "./FirestorePath";

const users = new FirestorePath<void, void>("users");
const user = new FirestorePath<UserKey, User>(`${users.template}/{uid}`);

const stats = new FirestorePath<UserKey, Stats>(`${user.template}/stats/data`);

export const firestorePaths = {
  users,
  user,
  stats,
};
