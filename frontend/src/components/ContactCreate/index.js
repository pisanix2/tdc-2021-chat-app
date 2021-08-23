import './index.css';
import React, { useState, useEffect, useRef } from "react"
import { contractSave } from "helpers/API"
import { sendNewContact } from "helpers/Socket"

const ContactCreate = (props) => {
  const [title, setTitle] = useState('')
  const [contact, setContact] = useState(null)

  const onContactCreated = (data) => {
    localStorage.setItem('contact', JSON.stringify(data))
    setContact(data)
    sendNewContact()
    // Call id change
  }

  const contactSave = () => {
    contractSave({ title }, onContactCreated)
  }

  useEffect(() => {
    const contact = localStorage.getItem('contact')
    if (contact) {
      setContact(JSON.parse(contact))
      // Call id change
    }
  }, [setContact])

  return (
    <div className="contact-create">
      {contact ?
        <div>
          Bem vindo {contact.title}
        </div>
      :
        < div >
          <p>Entre no nosso chat!</p>
          <input onChange={e => setTitle(e.target.value)}></input>
          <button onClick={contactSave}>Entrar</button>
        </div>
      }
    </div >
  )
}

export default ContactCreate;
