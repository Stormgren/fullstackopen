import React from 'react'

const ContactDetails = ({ name, number, removeContact }) => {
   
    return (
        <div>
        <h3>{name} {number}</h3>
         <button onClick={removeContact}>Delete</button> 
        </div>
    )
}

export default ContactDetails