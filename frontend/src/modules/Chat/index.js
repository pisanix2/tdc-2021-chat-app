import './index.css';
import React, { useState, useEffect, useRef } from "react"
import ContactList from 'components/ContactList'
import MessageList from 'components/MessageList'
import { connect, join, leave, subscribeToChat, sendMessage, disconnect } from 'helpers/Socket'

const LOGIN_CONTACT_ID = '742e59d7-4e0c-41c2-a1a9-14fd3f419b74'
const JOINED_PISANI_ID = '1bdbe1fb-c2c5-4a64-a3ad-e94c231765b2'
const JOINED_JULIO_ID = '3f725269-ca4f-4b12-9443-2db58a585b2d'

const Chat = (props) => {
  const [contacts, setContacts] = useState([])
  const [messages, setMessages] = useState([])

  const loadContactJoined = (contact_id) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/contact/${contact_id}/joined`
    )
      .then(res => res.json())
      .then(data => {
        setContacts(data)
      })
  }

  const sendNewMessage = (msg) => {
    sendMessage(JOINED_PISANI_ID, msg)
  }

  const onReceiveNewMessage = (err, data) => {
    setMessages(oldChats => [data, ...oldChats])
  }

  const onChangeContact = (old_joinned_id, new_joinned_id) => {
    if (old_joinned_id) {
      leave(old_joinned_id)
    }
    join(new_joinned_id)
  }

  useEffect(() => {
    loadContactJoined(LOGIN_CONTACT_ID)

    connect()
    join(JOINED_PISANI_ID)
    subscribeToChat(onReceiveNewMessage)

    return () => {
      disconnect();
    }
  }, [messages])

  return (
    <div className='chat'>
      <ContactList contacts={contacts} />
      <MessageList messages={messages} />
    </div>
  )
}

export default Chat;

/*
// Trocar contato
setTimeout(() => {
  onChangeContact(JOINED_PISANI_ID, JOINED_JULIO_ID)
}, 10000)
*/
/*
// Send new message
 setTimeout(() => {
   sendNewMessage('envio de nova msg')
 }, 3000)
*/