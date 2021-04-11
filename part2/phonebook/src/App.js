import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Form from './components/Form'
import Contacts from './components/Contacts'
import personService from './services/personService'
import Notification from './components/Notification'


const App = () => {
  
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch] = useState(false)
  const [searchRes, setSearchRes] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
 
    personService.getAll().then(res => {
      setPersons(res.data)
    })
  }, [])

  const formHandler = (e) => {
    e.preventDefault();
    
    const nameObject = {
      name: newName,
      number: newNumber
    }
     
    let arr = persons.filter(person => person.name === nameObject.name
    )
    
    if(arr.length === 0) { 
      personService.create(nameObject).then(response => {
      setPersons(persons.concat(response.data))

    setNewName('')
    setNewNumber('')

    setMessage(`Contact ${nameObject.name} has been added`)

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  })}  else {
       console.log(nameObject.number)
        if(window.confirm(`${nameObject.name} already exists, do you want to update number?`))
        {
          const updatedNumber = persons.find(n => n.name === newName);

          axios.put(`http://localhost:3001/persons/${updatedNumber.id}`, { ...updatedNumber, number: newNumber })
          .then(res => {
            setPersons(
              persons.filter(n => (n.name === newName ? res : n))
            );
          })
        }
     
    }

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

  
  const removeContact = (id, name) => {       
    const url = `http://localhost:3001/persons/${id}`
    const confirmation = window.confirm(`Are you sure you want to delete ${name}?`)
    if (confirmation){
        axios.delete(url)
    .then(() => {
      setPersons(persons.filter(n => n.id !== id));
      setNewName("");
      setNewNumber("");
    })
    
  }
  }

  return (
    <div>
      <Search searchRes={searchRes} searchHandler={searchHandler}/>

     <h2>Phonebook</h2>
     <Notification message={message}/>
     <Form 
     formHandler={formHandler}
     newName={newName}
     nameHandler={nameHandler}
     newNumber={newNumber}
      numberHandler={numberHandler}
     />

      <h2>Numbers</h2>
      <Contacts search={search} persons={persons} searchRes={searchRes} removeContact={removeContact} />
    </div>
  )
}

export default App