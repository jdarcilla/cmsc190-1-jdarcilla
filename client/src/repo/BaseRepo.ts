import { FirestorePath } from "core";

export abstract class BaseRepo<K, T> {
  protected firestorePath: FirestorePath<K, T>;

  constructor(firestorePath: FirestorePath<K, T>) {
    this.firestorePath = firestorePath;
  }
}
