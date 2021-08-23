import './index.css';
import React from 'react'

const MessageList = (props) => {
  const { messages } = props
  console.log(messages)
  return (
    <div className="message-container">
      <div className="message-list">
        {
          messages && messages.length > 0 &&
          messages.map(message =>
            <p>{message}</p>
          )
        }
      </div>
      <div className="message-send">
        <input type="text"></input>
        <buutton>Enviar</buutton>
      </div>
    </div>
  )
}

export default MessageList;
