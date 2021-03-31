import React from 'react'

const Form = ( { formHandler, newName, nameHandler, newNumber, numberHandler }) => {
    return (
        <form onSubmit={formHandler}>
        <div>
          name: <input 
          value={newName}
          onChange={nameHandler}
          />
        </div>
        <div>number: <input 
        value={newNumber}
        onChange={numberHandler}
        /></div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form