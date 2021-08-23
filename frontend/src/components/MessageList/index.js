import './index.css';
import React, { useState } from 'react'

import { sendMessage } from 'helpers/Socket'

const MessageList = (props) => {
  const { messages, joinedId, contact } = props
  const [message, setMessage] = useState('')

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };

  const onSendMessage = () => {
    if (message) {
      sendMessage(joinedId, contact.id, message)
      setMessage('')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSendMessage()
    }
  }

  return (
    <div className="message-container">
      <div className="message-list">
        {
          messages && messages.length > 0 &&
          messages.map(message =>
            <div className={`message-item ${contact.id !== message.contact ? "contact" : ""}`}>{contact.id === message.contact ? "Eu: " : "Ele(a): "}{message.message}</div>
          )
        }
      </div>
      <div className="message-send">
        <input type="text" value={message} onChange={handleMessageInput} onKeyDown={handleKeyDown}></input>
        <button onClick={onSendMessage}>Enviar</button>
      </div>
    </div>
  )
}

export default MessageList;
