import React, { useState } from 'react'

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

  const str = persons.filter(person => person.name.toLowerCase().includes(inputValue.toLowerCase()))
  setFiltered(str)

  console.log(filtered)
 
}

const data = person => <p key={person.name}>{person.name} {person.number}</p>



  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        Filter show with <input value={inputValue} onChange={filterHandler}/>
      </div>
      <form onSubmit={inputHandler}>
        <div>
          name: <input value={newName} onChange={newNameHandler}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={newNumberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

  {inputValue === '' ? persons.map(data) : filtered.map(data) } 
   
    </div>
  )
}

export default App