import firebase from "firebase/app";
import { fbAuthProvider } from "./Firebase";
import { googleAuthProvider } from "./Firebase";

async function OAuth(provider, setUser) {
  const result = await firebase
    .auth()
    .signInWithPopup(provider)
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
      console.log("email: ", email);
      console.log("credential: ", credential);
      // ...
    });

  // var credential = result.credential;

  // The signed-in user info.
  var user = result.user;
  setUser(user);

  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  // var accessToken = credential.accessToken;

  // ...
  // console.log("credential: ", credential);
  // console.log("user: ", user);
  // console.log("accessToken: ", accessToken);
}

export function facebookLogin(setUser) {
  OAuth(fbAuthProvider, setUser);
}
export function googleLogin(setUser) {
  OAuth(googleAuthProvider, setUser);
}
