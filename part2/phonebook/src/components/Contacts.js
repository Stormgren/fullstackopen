import React from 'react'
import ContactDetails from './ContactDetails'
import axios from 'axios'

    const Contacts = ({ search, persons, searchRes, removeContact }) => {
        let currentPersons = null;
        if (search) {
          currentPersons = persons.filter(person => {
            return (
              person.name.toLowerCase().includes(searchRes.toLowerCase()) 
            );
          });
        } else {
          currentPersons = [...persons];
        }

        return currentPersons.map(person => (
            <ContactDetails 
            removeContact={() => removeContact(person.id, person.name)} 
            key={person.id} id={person.id} name={person.name} number={person.number} />
        ));
      };
  
export default Contacts