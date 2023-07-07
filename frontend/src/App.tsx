import { useEffect, useRef, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import './App.css'
import axios from 'axios'
import GoogleButton from 'react-google-button'


function SignOut() {
  return (
    <button onClick={() => auth.signOut()} className='sign-out button'>Sign Out</button>
  )
}

function ChatMessage(props: any) {
  return (
    <div className="message">
      <p><strong>{`@${props.user}`}</strong>: {props.value}</p>
    </div>
  )
}

function ChatRoom(props: any) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const dummy = useRef()
  const user = props.user.displayName

  async function sendMessage(e: any) {
    e.preventDefault()
    await axios.post('http://localhost:3000/messages/post_message', { value: message, user: user })
    .then((response) => {
      console.log(response.data)
      console.log('new message')
      setMessage("")
    })

  }

  async function getMessages() {
    const response = await axios.get('http://localhost:3000/messages/get_messages')
    const responseData = response.data
    console.log(responseData)

    let displayMessages = responseData.map((message: any) => {
      return (
        <ChatMessage key={message._id} value={message.value} user={message.user} />
      )
    })
    setMessages(displayMessages)
  }

  useEffect(() => {
    getMessages()
  }, [message])

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return (
    <div className='chat-room'>
      <main className='messages'>
        <div className='text-messages'>
          {messages}
        </div>

        <span ref={dummy}></span>
      </main>

      <form className='input'>
        <input className='input-field' type="sumbit" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='send a message' />
        <button className='input-button button' onClick={sendMessage}>send</button>
      </form >
    </div>
  )
}

function App() {
  const [user, loading] = useAuthState(auth)

  function SignIn() {
    const googleProvider = new GoogleAuthProvider()
    const GoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider)
        console.log(result.user)
      } catch (error) {
        console.log(error)
      }
    }
    return (
      <>
        <GoogleButton onClick={GoogleLogin} />
      </>
    )
  }

  return (
    <div className='App'>
      <header>
        {user ? <SignOut /> : <></>}
      </header>

      <div className="container">
        {user ? <ChatRoom user={user} /> : <SignIn />}
      </div>
    </div>
  )
}

export default App
