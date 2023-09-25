import * as admin from "firebase-admin";

const undef2null = (obj: any) => {
  if (!obj) return;
  for (const k in obj) {
    if (obj[k] && typeof obj[k] === "object") {
      undef2null(obj[k]);
    } else {
      if (obj[k] === undefined) obj[k] = null;
    }
  }
};

const getDoc = async <T>(path: string): Promise<T | null> => {
  const doc = await admin.firestore().doc(path).get();
  if (doc.exists) return doc.data() as T;
  return null;
};

const getDocNullSafe = async <T>(path: string): Promise<T> => {
  const doc = await admin.firestore().doc(path).get();
  if (doc.exists) return doc.data() as T;
  throw new Error(`Expected document at path ${path} not found.`);
};

const getDocWithDefault = async <T>(path: string, _default: T): Promise<T> => {
  const doc = await admin.firestore().doc(path).get();
  if (doc.exists) return doc.data() as T;
  return _default;
};

const putDoc = async <T>(
  path: string,
  obj: T
): Promise<admin.firestore.WriteResult> => {
  undef2null(obj);
  return admin
    .firestore()
    .doc(path)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .set(obj as { [x: string]: any });
};

const mergeDoc = async <T>(
  path: string,
  obj: Partial<T>
): Promise<admin.firestore.WriteResult> => {
  undef2null(obj); // firestore does not support undefined as a value
  return admin.firestore().doc(path).set(obj, {merge: true});
};

const deleteDoc = async (
  path: string
): Promise<admin.firestore.WriteResult> => {
  return admin.firestore().doc(path).delete();
};

const getCollectionValues = async <T>(path: string): Promise<T[]> => {
  const collection = await admin.firestore().collection(path).get();
  if (collection.empty) return [];
  return collection.docs.map(
    (doc: admin.firestore.QueryDocumentSnapshot) => doc.data() as T
  );
};

const ref = (path: string) => {
  return admin.firestore().doc(path);
};

export const firestoreApi = {
  getDoc,
  getDocNullSafe,
  getDocWithDefault,
  putDoc,
  mergeDoc,
  deleteDoc,
  getCollectionValues,
  ref,
};
