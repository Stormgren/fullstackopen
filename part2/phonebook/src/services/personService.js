import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson);
    return request
}

export default { getAll, create }