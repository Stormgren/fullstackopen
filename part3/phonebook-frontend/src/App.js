import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Form from "./components/Form";
import Contacts from "./components/Contacts";
import personService from "./services/personService";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState(false);
  const [searchRes, setSearchRes] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  //Hook for returning all the contacts from server
  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  //Handler for form and logic for adding or editing contacts
  const formHandler = (e) => {
    e.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    let arr = persons.filter((person) => person.name === nameObject.name);

    if (arr.length === 0) {
      personService.create(nameObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
        setMessage(`Contact ${nameObject.name} has been added`);

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    } else {
      if (
        window.confirm(
          `${nameObject.name} already exists, do you want to update number?`
        )
      ) {
        const updatedNumber = persons.find((person) => person.name === newName);

        personService
          .update(updatedNumber.id, { ...updatedNumber, number: newNumber })
          .then((res) => {
            setPersons(
              persons.filter((person) =>
                person.name === newName ? res : person
              )
            );
          })
          .catch((error) => {
            setErrorMsg(`Contact ${nameObject.name} has been removed`);

            setTimeout(() => {
              setErrorMsg(null);
            }, 5000);
          });
      }
    }
  };

  const nameHandler = (e) => {
    setNewName(e.target.value);
  };

  const numberHandler = (e) => {
    setNewNumber(e.target.value);
  };

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
    const confirmation = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (confirmation) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((n) => n.id !== id));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  return (
    <div>
      <Search searchRes={searchRes} searchHandler={searchHandler} />

      <h2>Phonebook</h2>
      <Error errorMsg={errorMsg} />
      <Notification message={message} />
      <Form
        formHandler={formHandler}
        newName={newName}
        nameHandler={nameHandler}
        newNumber={newNumber}
        numberHandler={numberHandler}
      />

      <h2 className="numbers-header">Numbers</h2>
      <Contacts
        search={search}
        persons={persons}
        searchRes={searchRes}
        removeContact={removeContact}
      />
    </div>
  );
};

export default App;
