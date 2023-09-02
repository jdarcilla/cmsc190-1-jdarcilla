import firestore from '@react-native-firebase/firestore';
import { fromResource, IResource } from 'mobx-utils';
import { ToastAndroid } from 'react-native';
import { firestoreApi } from '../firestoreApi';
import { BaseRepo } from './BaseRepo';

export class DocumentRepo<K, T> extends BaseRepo<K, T> {
  //
  get = (key: K): Promise<T | null> => {
    return firestoreApi.getDoc(this.firestorePath.path(key));
  };

  put = (key: K, obj: T) => {
    return firestoreApi.putDoc(this.firestorePath.path(key), obj);
  };

  update = (key: K, obj: Partial<T>) => {
    return firestoreApi.mergeDoc(this.firestorePath.path(key), obj);
  };

  delete = (key: K) => {
    return firestoreApi.deleteDoc(this.firestorePath.path(key));
  };

  bind = (key: K, _default?: T): IResource<T | null | undefined> => {
    let disposer: () => void;
    return fromResource<T | null | undefined>(
      sink => {
        console.log(`Subscribing `, key);
        disposer = firestore()
          .doc(this.firestorePath.path(key))
          .onSnapshot(
            snap => {
              if (snap.exists) sink(snap.data() as T);
              else sink(_default ?? null);
            },
            error => {
              console.error(`${this.firestorePath.path(key)}`, error);
              ToastAndroid.show(error.message, ToastAndroid.SHORT);
              sink(null);
            }
          );
      },
      () => {
        console.log(`Unsubscribing `, key);
        disposer();
      },
      undefined
    );
  };
}
