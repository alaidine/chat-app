import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState("")

  function sendMessage() {
    axios.post('http://localhost:3000/messages/post_message', {value: message}).then((response) => console.log(response.data))
    setMessage("")
  }

  useEffect(() => {
    axios.get('http://localhost:3000/messages/get_messages').then((response) => console.log(response.data))
  }, [])

  return (
    <div className="wrapper">

      <div>
        <input onChange={(e) => setMessage(e.target.value)} placeholder='send a message' />
        <button onClick={sendMessage} />
      </div>
    </div>
  )
}

export default App
