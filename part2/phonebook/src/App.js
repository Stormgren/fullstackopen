import React, { useState } from 'react'

import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [inputValue, setValue] = useState('')
  const [filtered, setFiltered] = useState([{}])

const newNameHandler = (event) => {
    event.preventDefault();
    setNewName(event.target.value)

}

const newNumberHandler = (event) => {
  event.preventDefault();
  setNewNumber(event.target.value);
}

const inputHandler = (event) =>{
  event.preventDefault();
    const pers = {
      name: newName,
      number: newNumber
    }

    if(persons.map(person => person.name).includes(pers.name)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(pers))
    }

    setNewName('');  
    setNewNumber('')
}

const filterHandler = (event) => {
  event.preventDefault()
  setValue(event.target.value)
  setFiltered(persons.filter(person => person.name.toLowerCase().includes(inputValue.toLowerCase())))
}

//Variable for showing .map results
const data = person => <Persons key={person.name} name={person.name} number={person.number}/>



return (
  <div>
    <h2>Phonebook</h2>

    <Filter inputValue={inputValue} filterHandler={filterHandler}/>

    <PersonForm inputHandler={inputHandler} newName={newName} newNameHandler={newNameHandler} newNumberHandler={newNumberHandler} newNumber={newNumber} />

    <h2>Numbers</h2>

    {inputValue === '' ? persons.map(data) : filtered.map(data) } 
   
    </div>
  )
}

export default App