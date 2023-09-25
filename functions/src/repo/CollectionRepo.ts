/* eslint-disable require-jsdoc */
import {firestoreApi} from "../integration/firestoreApi";
import {BaseRepo} from "./BaseRepo";

export class CollectionRepo<K, T> extends BaseRepo<K, T> {
  // WARNING: Potentially dangerous method, may load huge list of documents.
  listAllValues_UNSAFE = (key: K): Promise<T[]> => {
    console.warn("Potentially dangerous method. Please read the description");
    return firestoreApi.getCollectionValues(this.firestorePath.path(key));
  };
}
