import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Container,
  Button,
  Input,
} from "@mui/material";
import GoogleButton from "react-google-button";
import Head from "next/head";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

firebase.initializeApp({
  apiKey: "AIzaSyD37qlyAef_2lwMrw29QSy4pybUUCCKcto",
  authDomain: "chat-app-a7ade.firebaseapp.com",
  projectId: "chat-app-a7ade",
  storageBucket: "chat-app-a7ade.appspot.com",
  messagingSenderId: "219994442628",
  appId: "1:219994442628:web:a23c8b71330df3f0fbebd1",
  measurementId: "G-8NT4LSEY1E",
});

export default function Home() {
  var [userStatus, setUserStatus] = useState(false);

  function SignOut() {
    return (
      firebase.auth().currentUser && (
        <Button
          sx={{ color: "black", background: "white" }}
          onClick={() =>
            firebase
              .auth()
              .signOut()
              .then(() => {
                setUserStatus((userStatus = false));
              })
          }
        >
          Sign Out
        </Button>
      )
    );
  }

  const provider = new GoogleAuthProvider();
  function SignIn() {
    const auth = getAuth();
    const handleClick = () => {
      signInWithPopup(auth, provider).then(() => {
        setUserStatus((userStatus = true));
        console.log("logged in");
        console.log(userStatus);
      });
    };

    return (
      <div>
        <GoogleButton onClick={handleClick} />
      </div>
    );
  }

  function ChatMessage(props: any) {
    const text = props.message.text;

    return <Typography>{text}</Typography>;
  }

  function Chat() {
    // const auth = firebase.auth();
    const [formValue, setFormValue] = useState("");

    // an array of object that stores the messages sent to the database
    const messagesRef = firebase.firestore().collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);

    const [messages] = useCollectionData(
      query as any,
      { idField: "id" } as any
    );

    async function sendMessage(e: any): Promise<void> {
      e.preventDefault();

      // add a document to the messages collection
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // clear the input field
      setFormValue("");
    }

    return (
      <Box width="300px" height="100%" p={1} position="relative">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar>
            <Toolbar>
              <SignOut />
            </Toolbar>
          </AppBar>
        </Box>

        <Box mt={3} position="absolute" bottom="Opx">
          <div>
            {messages &&
              messages.map((msg) => (
                <ChatMessage /* key={msg.id} */ message={msg} />
              ))}
          </div>

          <form onSubmit={sendMessage}>
            <Input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            />
            <Button type="submit" sx={{ color: "black" }}>
              send
            </Button>
          </form>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>chat-app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <section>{userStatus ? <Chat /> : <SignIn />}</section>
        </Box>
      </Container>
    </>
  );
}
