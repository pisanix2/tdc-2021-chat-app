import './index.css';
import React from 'react'

const ContactList = (props) => {
  const { contacts, handlerContact } = props

  const onContactClick = (contact) => {
    return () => {
      handlerContact(contact)
    }
  }

  return (
    <div className="contact-list">
      <p>Contact list</p>
      <>
        {
          contacts && contacts.length > 0 &&
          contacts.map(contact =>
            <button onClick={onContactClick(contact)}>{contact.title}</button>
          )
        }
      </>
    </div>
  )
}

export default ContactList;
