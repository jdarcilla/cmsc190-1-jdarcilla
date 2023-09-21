import { FirestorePath } from '../paths/FirestorePath';

export abstract class BaseRepo<K, T> {
  protected firestorePath: FirestorePath<K, T>;

  constructor(firestorePath: FirestorePath<K, T>) {
    this.firestorePath = firestorePath;
  }
}
