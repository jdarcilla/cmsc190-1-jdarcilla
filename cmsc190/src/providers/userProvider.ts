import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { ToastAndroid } from 'react-native';

class UserProvider {
  user: FirebaseAuthTypes.User | null | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {
      user: observable,
      login: action,
      logout: action,
      displayName: computed,
    });
  }

  get displayName(): string {
    if (!this.user) return '';
    if (!this.user.displayName) return '';
    return this.user.displayName;
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
