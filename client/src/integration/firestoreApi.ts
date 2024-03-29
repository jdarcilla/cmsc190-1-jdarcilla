import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { undef2null } from "core";

export type Cursor =
  FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;

const getDoc = async <T>(path: string): Promise<T | null> => {
  const doc = await firestore().doc(path).get();
  if (doc.exists) return doc.data() as T;
  return null;
};

const putDoc = async <T>(path: string, obj: T): Promise<void> => {
  undef2null(obj);
  return firestore()
    .doc(path)
    .set(obj as { [x: string]: any });
};

const mergeDoc = async <T>(path: string, obj: Partial<T>): Promise<void> => {
  undef2null(obj); // firestore does not support undefined as a value
  return firestore().doc(path).set(obj, { merge: true });
};

const deleteDoc = async (path: string): Promise<void> => {
  return firestore().doc(path).delete();
};

const buildCollectionQuery = <T>(args: {
  path: string;
  where: [string, FirebaseFirestoreTypes.WhereFilterOp, string];
  where2?: [string, FirebaseFirestoreTypes.WhereFilterOp, string];
  orderByField: Extract<keyof T, string>;
  orderByDirection: "desc" | "asc";
  limit?: number;
  cursor?: Cursor;
}) => {
  //
  const {
    path,
    orderByField,
    orderByDirection,
    limit = 100,
    cursor,
    where,
    where2,
  } = args;

  // create query and where clause
  let query = firestore().collection(path).where(where[0], where[1], where[2]);
  // where2 clause
  if (where2) query = query.where(where2[0], where2[1], where2[2]);
  // order by
  query = query.orderBy(orderByField, orderByDirection);
  // limit
  if (limit) query = query.limit(limit);
  // cursor
  if (cursor) query = query.startAfter(cursor);

  return query;
};

export const firestoreApi = {
  getDoc,
  putDoc,
  mergeDoc,
  deleteDoc,
  buildCollectionQuery,
};
