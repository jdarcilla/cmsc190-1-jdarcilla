import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { repo } from "../repo";

export const createUser = async (userRecord: UserRecord) => {
  const existingUser = await repo.user.get(userRecord);
  if (existingUser) {
    console.warn(`User ${userRecord.uid} already present.`);
    return;
  }

  const { uid } = userRecord;
  await repo.user.put({ uid }, { uid, notificationEnabled: true });
};
