import './index.css';
import React from 'react'

import ContactCreate from 'components/ContactCreate'

const ContactList = (props) => {
  const { contacts, handlerContact, joinedId } = props
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
            <button className={`btn-contact ${joinedId === contact.joinned ? 'active' : ''}`} onClick={onContactClick(contact)}>{contact.title}</button>
          )
        }
      </div>
    </div>
  )
}

export default ContactList;
