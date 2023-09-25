import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { repo } from 'client';
import { User } from 'core';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { IResource } from 'mobx-utils';
import { ToastAndroid } from 'react-native';

class UserProvider {
  user: FirebaseAuthTypes.User | null | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {
      user: observable,
      login: action,
      logout: action,
      displayName: computed,
      userData: computed,
    });
  }

  get displayName(): string {
    if (!this.user) return '';
    if (!this.user.displayName) return '';
    return this.user.displayName;
  }

  get userData(): IResource<User | null | undefined> | undefined {
    if (!this.user?.uid) return;
    return repo.user.bind({ uid: this.user.uid });
  }

  login(user: FirebaseAuthTypes.User | null) {
    this.user = user;
  }

  logout() {
    auth()
      .signOut()
      .then(() =>
        ToastAndroid.show('Successfully logged out!', ToastAndroid.SHORT)
      )
      .catch(error => console.error(error));
  }

  clear() {}
}

export const userProvider = new UserProvider();

auth().onAuthStateChanged(user => {
  userProvider.login(user);
});
