/* eslint-disable require-jsdoc */
import {firestoreApi} from "../integration/firestoreApi";
import {BaseRepo} from "./BaseRepo";

export class DocumentRepo<K, T> extends BaseRepo<K, T> {
  get = (key: K): Promise<T | null> => {
    return firestoreApi.getDoc(this.firestorePath.path(key));
  };

  getNullSafe = (key: K): Promise<T> => {
    return firestoreApi.getDocNullSafe(this.firestorePath.path(key));
  };

  getWithDefault = (key: K, _default: T): Promise<T> => {
    return firestoreApi.getDocWithDefault(
      this.firestorePath.path(key),
      _default
    );
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
}
