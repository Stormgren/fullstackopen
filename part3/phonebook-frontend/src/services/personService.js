import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl);
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson);
}

const update = (id, newObject) => {
return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

//Created variable to remove Assign object to a variable before exporting as module default warning
const personService = { getAll, create, update, remove }

export default personService
