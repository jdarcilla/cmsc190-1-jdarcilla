import * as functions from "firebase-functions";
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendNotification = functions.pubsub
  .schedule("*/2 * * * *")
  .timeZone("Asia/Manila")
  .onRun(async () => {
    functions.logger.log("NOTIFICATION FROM CLOUD FUNCTION");
  });
