import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from "../firebase";
import firebase from "firebase";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/allmeetings",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};
export default function () {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}
