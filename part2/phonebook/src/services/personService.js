import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl);
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson);
}

const update = (id, newObject) => {
return axios.put(`${baseUrl}/${id}`, newObject)
}

//Created variable to remove Assign object to a variable before exporting as module default warning
const personService = { getAll, create, update }

export default personService
