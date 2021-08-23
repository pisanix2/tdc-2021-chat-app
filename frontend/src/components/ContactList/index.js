import './index.css';
import React from 'react'

import ContactCreate from 'components/ContactCreate'

const ContactList = (props) => {
  const { contacts, handlerContact } = props

  const onContactClick = (contact) => {
    return () => {
      handlerContact(contact)
    }
  }

  return (
    <div className="contact-list">
      <ContactCreate />
      <div className="contact-list-container">
        {
          contacts && contacts.length > 0 &&
          contacts.map(contact =>
            <button className="btn-contact" onClick={onContactClick(contact)}>{contact.title}</button>
          )
        }
      </div>
    </div>
  )
}

export default ContactList;
