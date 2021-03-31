import React, { useState } from 'react'

import Search from './components/Search'
import Form from './components/Form'
import Contacts from './components/Contacts'

const App = () => {
  
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch] = useState(false)
  const [searchRes, setSearchRes] = useState('')



  const formHandler = (e) => {
    e.preventDefault();
    
    const nameObject = {
      name: newName,
      number: newNumber
    }
     
    let arr = persons.filter(person => person.name === nameObject.name
    )

    arr.length === 0 ? setPersons(persons.concat(nameObject)) : alert(`${nameObject.name} already exists`)
    setNewName('')
    setNewNumber('')
  }

  const nameHandler = (e) => {
    setNewName(e.target.value);
  }

  const numberHandler = (e) => {
    setNewNumber(e.target.value)
  }

  const searchHandler = (e) => {
    e.preventDefault();
    const str = e.target.value;
    if (str.trim().length > 0) {
      setSearch(true);
    } else {
      setSearch(false);
    }
    setSearchRes(str);
  };

  return (
    <div>
      <Search searchRes={searchRes} searchHandler={searchHandler}/>

     <h2>Phonebook</h2>
     <Form 
     formHandler={formHandler}
     newName={newName}
     nameHandler={nameHandler}
     newNumber={newNumber}
      numberHandler={numberHandler}
     />

      <h2>Numbers</h2>
      <Contacts search={search} persons={persons} searchRes={searchRes}/>
    </div>
  )
}

export default App