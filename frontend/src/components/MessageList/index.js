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
    sendMessage(joinedId, contact, message)
    setMessage('')
  }

  return (
    <div className="message-container">
      <div className="message-list">
        {
          messages && messages.length > 0 &&
          messages.map(message =>
            <div className={`message-item ${contact !== message.contact ? "contact" : ""}`}>{message.message}</div>
          )
        }
      </div>
      <div className="message-send">
        <input type="text" value={message} onChange={handleMessageInput}></input>
        <button onClick={onSendMessage}>Enviar</button>
      </div>
    </div>
  )
}

export default MessageList;
