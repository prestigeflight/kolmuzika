// components/Auth.js

import firebase from '../firebaseConfig';

const Auth = () => {
  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={signIn}>Sign In with Google</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Auth;
