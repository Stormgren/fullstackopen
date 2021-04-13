const { request, response } = require('express');
const express = require('express')
const app = express();

app.use(express.json())


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Marry Poppendick",
        number: "39-23-6423122"
    }
    
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
        console.log(response.status(404).end())
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const idGenerator = () => {
    const randomId = Math.floor(Math.random() * 1000) 
    const minId = persons.length + 1 
    
    //If randomId is less than minId, then minId will be set as an id
    if(randomId >= minId ){
        //check and prevent duplicatation of id
        if(persons.find(num => num.id === randomId)){
            return minId
        } else {
        return randomId
    } 
    }   else {
        return minId
    }
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    const personFinder = persons.find(pers => pers.name === body.name)

    if(!body.name){
        return response.status(400).json({
            error: 'Name is missing'
        })
    } else if (!body.number){
        return response.status(400).json({
            error: 'Number is missing'
        })
    } else if (personFinder){
        return response.status(400).json({
            error: `${body.name} already exists`
        })
    }

    const personObject = {
        id: idGenerator(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(personObject)

    console.log(persons)
    response.json(personObject)
})

app.get('/info', (request, response) => {
    const amount = persons.length
    const time = new Date()
    console.log(time)
    response.send(`<p>Phonebook has info for ${amount} people</p>
    <p>${time}</p>
    `)
    
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})