/* eslint-disable require-jsdoc */

import {firestoreApi} from "../integration/firestoreApi";
import {FirestorePath} from "../paths/FirestorePath";

export abstract class BaseRepo<K, T> {
  protected firestorePath: FirestorePath<K, T>;

  constructor(firestorePath: FirestorePath<K, T>) {
    this.firestorePath = firestorePath;
  }

  ref = (key: K) => {
    return firestoreApi.ref(this.firestorePath.path(key));
  };
}
