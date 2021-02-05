import React, { useState } from 'react';
import Contact from './components/Contact';

const App = (props) => {
  const [contacts, setContacts] = useState([
    { name: "Arthur Morgan", number: '040-867-5309' },
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState("")
  

  // const addNote = (event) => {
  //   event.preventDefault();
    
  //   const noteObj = {
  //     content: newNote,
  //     date: new Date().toISOString(),
  //     important: Math.random() < 0.5,
  //     id: notes.length + 1,
  //   }

  //   setNotes(notes.concat(noteObj))
  //   createNewNote("")
  // }

  const addContact = (event) => {
    event.preventDefault();

    const contactObj = {
      name: newName,
    
    }

    setContacts(contacts.concat(contactObj));
    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

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
          
          <button type="submit">Save Contact</button>
      </form>

      <div className="all-contacts">
        <ul>
          {contacts.map(contact => <Contact key={contact.name} contact={contact} /> )}    
        </ul>
      </div>
    </div>
  )
}

export default App 