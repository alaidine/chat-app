import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'


function SignOut() {
  return (
    <button className='sign-out'>Sign Out</button>
  )
}

function SignIn() {
  return (
    <>
      <p>not logged in</p>
    </>
  )
}

function ChatMessage(props: any) {
  return (
    <div className="message">
      <p><strong>{`@${props.user}`}</strong>: {props.value}</p>
    </div>
  )
}

function ChatRoom() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const dummy = useRef()

  async function sendMessage(e: any) {
    e.preventDefault()
    await axios.post('http://localhost:3000/messages/post_message', { value: message })
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
    <div className='App'>
      <header>
        <SignOut />
      </header>
      

      <main className='messages'>
        <div className='text-messages'>
          {messages}
        </div>

        <span ref={dummy}></span>
      </main>

      <form className='input'>
        <input className='input-field' type="sumbit" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='send a message' />
        <button className='input-button' onClick={sendMessage}>send</button>
      </form >
    </div>
  )
}

function App() {
  let user = true

  return (
    <>
      {user ? <ChatRoom /> : <SignIn />}
    </>
  )
}

export default App
