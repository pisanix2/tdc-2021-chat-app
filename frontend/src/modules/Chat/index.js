import './index.css';
import React, { useState, useEffect, useRef } from "react"
import ContactList from 'components/ContactList'
import MessageList from 'components/MessageList'
import { connect, join, leave, subscribeToChat, sendMessage, disconnect, subscribeToNewContact } from 'helpers/Socket'
import { loadContactJoined } from "helpers/API"

const LOGIN_CONTACT_ID = 'a74979f2-5c2a-41b6-a5bc-ded8c1649b8e'
const JOINED_PISANI_ID = 'e5126dc5-8c6d-4c0f-8a4a-6b8e7c0dfb66'

const Chat = (props) => {
  const [contacts, setContacts] = useState([])
  const [messages, setMessages] = useState([])

  const loadContact = () => {
    loadContactJoined(LOGIN_CONTACT_ID, setContacts)
  }

  const sendNewMessage = (msg) => {
    sendMessage(JOINED_PISANI_ID, LOGIN_CONTACT_ID, msg)
  }

  const onReceiveNewMessage = (err, data) => {
    setMessages(oldChats => [...oldChats, data])
  }

  const onNewContact = (err, data) => {
    loadContact()
  }

  const onChangeContact = (old_joinned_id, new_joinned_id) => {
    if (old_joinned_id) {
      leave(old_joinned_id)
    }
    join(new_joinned_id)
  }

  useEffect(() => {
    loadContact()

    connect()
    join(JOINED_PISANI_ID)
    subscribeToChat(onReceiveNewMessage)
    subscribeToNewContact(onNewContact)

    return () => {
      disconnect();
    }
  }, [messages])

  return (
    <div className='chat'>
      <ContactList contacts={contacts} />
      <MessageList messages={messages} joinedId={JOINED_PISANI_ID} contact={LOGIN_CONTACT_ID} />
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