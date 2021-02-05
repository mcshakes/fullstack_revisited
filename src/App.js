import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import axios from "axios";

const App = (props) => {
  const [contacts, setContacts] = useState([
    { name: "Arthur Morgan", number: '040-867-5309' },
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  

  const addContact = (event) => {
    event.preventDefault();

    const contactObj = {
      name: newName,
      number: newNumber
    }

    setContacts(contacts.concat(contactObj));
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const hook = () => {
    // axios.get
    // setContacts
  }

  useEffect(hook,[])

  return (
    <div>
      <h1>Contact Directory</h1>
      <form 
        onSubmit={addContact}>

          <div>
            Name:
            <input type="text" 
              value={newName}
              onChange={handleNameChange}
            />
          </div>

          <div>
            Name:
            <input type="text" 
              value={newNumber}
              onChange={handleNumChange}
            />
          </div>
          
          <button type="submit">Save Contact</button>
      </form>

      <div className="all-contacts">
        <ContactList contacts={contacts} />
      </div>
    </div>
  )
}

export default App 