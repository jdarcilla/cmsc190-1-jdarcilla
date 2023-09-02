import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { fromResource, IResource } from 'mobx-utils';
import { ToastAndroid } from 'react-native';
import { Cursor, firestoreApi } from '../firestoreApi';
import { BaseRepo } from './BaseRepo';

export class CollectionRepo<K, T> extends BaseRepo<K, T> {
  bindCollection = (key: K): IResource<T[]> => {
    console.warn('Potentially dangerous method. Please read the description');
    let disposer: () => void;
    return fromResource<T[]>(
      sink => {
        disposer = firestore()
          .collection(this.firestorePath.path(key))
          .onSnapshot(
            snap => {
              sink(snap.docs.map(e => e.data() as T));
            },
            error => {
              console.error(`${this.firestorePath.path(key)}`, error);
              ToastAndroid.show(error.message, ToastAndroid.SHORT);
              sink([]);
            }
          );
      },
      () => {
        disposer();
      },
      []
    );
  };

  bindCollectionQuery = (args: {
    key: K;
    where: [string, FirebaseFirestoreTypes.WhereFilterOp, string];
    where2?: [string, FirebaseFirestoreTypes.WhereFilterOp, string];
    orderByField: Extract<keyof T, string>;
    orderByDirection: 'desc' | 'asc';
    limit?: number;
    cursor?: Cursor;
  }): IResource<T[]> => {
    let disposer: () => void;
    return fromResource<T[]>(
      sink => {
        const path = this.firestorePath.path(args.key);
        const query = firestoreApi.buildCollectionQuery({ ...args, path });
        disposer = query.onSnapshot(
          snap => {
            sink(snap.docs.map(e => e.data() as T));
          },
          error => {
            console.error(`${args}, error`);
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            sink([]);
          }
        );
      },
      () => {
        disposer();
      },
      []
    );
  };
}
