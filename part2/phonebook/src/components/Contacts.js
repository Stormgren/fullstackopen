import React from 'react'
import ContactDetails from './ContactDetails'

    const Contacts = ({ search, persons, searchRes }) => {
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
            <ContactDetails key={person.name} name={person.name} number={person.number} />
        ));
      };
  
export default Contacts