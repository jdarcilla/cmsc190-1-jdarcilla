import "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import functions from "@react-native-firebase/functions";

console.log("DEV: ", __DEV__);

if (__DEV__) {
  auth().useEmulator(`http://localhost:9099`);
  firestore().useEmulator(`localhost`, 8080);
  functions().useEmulator(`localhost`, 5001);
}

export const fs = firestore();
