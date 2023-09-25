/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const {
  sendGoalNotification,
  sendTestNotification,
} = require("./messaging/sendNotification");
const { createUser } = require("./user/createUser");

exports.sendGoalNotification = functions.pubsub
  .schedule("0 19 * * *")
  .timeZone("Asia/Manila")
  .onRun(async () => {
    functions.logger.log("GOAL NOTIFICATION FROM CLOUD FUNCTION");

    await sendGoalNotification();
  });

exports.sendTestNotification = functions.pubsub
  .schedule("0 19 * */1 *")
  .timeZone("Asia/Manila")
  .onRun(async () => {
    functions.logger.log("TEST NOTIFICATION FROM CLOUD FUNCTION");

    await sendTestNotification();
  });

exports.createUser = functions.auth.user().onCreate(createUser);
