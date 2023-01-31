import Head from "next/head";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyD37qlyAef_2lwMrw29QSy4pybUUCCKcto",
  authDomain: "chat-app-a7ade.firebaseapp.com",
  projectId: "chat-app-a7ade",
  storageBucket: "chat-app-a7ade.appspot.com",
  messagingSenderId: "219994442628",
  appId: "1:219994442628:web:a23c8b71330df3f0fbebd1",
  measurementId: "G-8NT4LSEY1E"

};
const app = firebase.initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()

export default function Home() {
  var [userStatus, setUserStatus] = useState(false);  

  function SignOut() {
    return firebase.auth().currentUser && (
      <button onClick={() => firebase.auth().signOut().then(() => {setUserStatus(userStatus = false)})}>Sign Out</button>
    )
  }

  function SignIn() {
    const auth = getAuth();
    const handleClick = () => {
      signInWithPopup(auth, provider)
        .then(() => {
          setUserStatus(userStatus = true)
          console.log("logged in")
          console.log(userStatus)
        })
      
    }

    return (
      <div>
        <button onClick={handleClick}>Sign in</button>
      </div>
    )
  }

  function Chat() {
    return (
      <div>
        <SignOut />
        <h1>Chat</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>chat-app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <section>{userStatus ? <Chat /> : <SignIn />}</section>
      </main>
    </>
  );
}
