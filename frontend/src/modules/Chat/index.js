import './index.css';
import React, { useState, useEffect, useRef } from "react"
import ContactList from 'components/ContactList'
import MessageList from 'components/MessageList'
import { connect, join, leave, subscribeToChat, sendMessage, disconnect, subscribeToNewContact } from 'helpers/Socket'
import { loadContactJoined, messageByRoom } from "helpers/API"

const LOGIN_CONTACT_ID = 'a74979f2-5c2a-41b6-a5bc-ded8c1649b8e'
let JOINED_PISANI_ID = null

const Chat = (props) => {
  const [activeContact, setActiveContact] = useState(null)
  const [contacts, setContacts] = useState([])
  const [messages, setMessages] = useState([])

  const handlerContact = (contact) => {
    changeContact(JOINED_PISANI_ID, contact.joinned)
  }

  const onReceiveNewMessage = (err, data) => {
    setMessages(oldChats => [...oldChats, data])
  }

  const changeContact = (old_joinned_id, new_joinned_id) => {
    if (old_joinned_id) {
      leave(old_joinned_id)
    }
    join(new_joinned_id)
    JOINED_PISANI_ID = new_joinned_id
    messageByRoom(new_joinned_id, (data) => {
      setMessages(data)
    })
  }

  useEffect(() => {
    const contact = localStorage.getItem('contact')
    if (contact) {
      const contactObj = JSON.parse(contact)
      setActiveContact(contactObj)
      loadContactJoined(contactObj.id, setContacts)
    }
  }, [setActiveContact])

  useEffect(() => {
    connect()
    join(JOINED_PISANI_ID)
    subscribeToChat(onReceiveNewMessage)

    const loadContact = () => {
      if (activeContact) {
        loadContactJoined(activeContact.id, setContacts)
      }
    }
    subscribeToNewContact(loadContact)

    return () => {
      disconnect();
    }
  }, [messages, activeContact])

  return (
    <div className='chat'>
      <ContactList contacts={contacts} joinedId={JOINED_PISANI_ID} handlerContact={handlerContact} />
      <MessageList messages={messages} joinedId={JOINED_PISANI_ID} contact={activeContact} />
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