const { request, response } = require('express');
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express();
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors());

morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// let persons = [
//     {
//         id: 1,
//         name: "Arto Hellas",
//         number: "040-123456"
//     },
//     {
//         id: 2,
//         name: "Ada Lovelace",
//         number: "39-44-5323523"
//     },
//     {
//         id: 3,
//         name: "Dan Abramov",
//         number: "12-43-234345"
//     },
//     {
//         id: 4,
//         name: "Marry Poppendick",
//         number: "39-23-6423122"
//     }
    
// ]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(data => {
        response.json(data)
    })
})

// app.get('/api/persons/:id', (request, response) => {
//     const id = String(request.params.id)
//     const person = persons.find(person => person.id === id)

//     if(person) {
//         response.json(person)
//     } else {
//         response.status(404).end()
//         console.log(response.status(404).end())
//     }
// })

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(res => {
        response.json(res)
    })
  })
// app.delete('/api/persons/:id', (request, response) => {
//   Person.findById(request.params.id).then(res => {
//       response.json(res)
//   })
// })


// const idGenerator = () => {
//     const randomId = Math.floor(Math.random() * 1000) 
//     const minId = persons.length + 1 
    
//     //If randomId is less than minId, then minId will be set as an id
//     if(randomId >= minId ){
//         //check and prevent duplicatation of id
//         if(persons.find(num => num.id === randomId)){
//             return minId
//         } else {
//         return randomId
//     } 
//     }   else {
//         return minId
//     }
// }

// app.post('/api/persons', (request, response) => {
//     const body = request.body

//     if(body.name === undefined){
//         return response.status(404).json({error: 'Content is missing'})
//     }

    // if(!body.name){
    //     return response.status(400).json({
    //         error: 'Name is missing'
    //     })
    // } else if (!body.number){
    //     return response.status(400).json({
    //         error: 'Number is missing'
    //     })
    // // } 
    // else if (personFinder){
    //     return response.status(400).json({
    //         error: `${body.name} already exists`
    //     })
    // }
//     console.log('body content is ')
//     console.log(body)

//     const contact = new Person({
//         name: body.name,
//         number: body.number
//   })

//     contact.save().then(savedContact => {
//         console.log(savedContact)
//         response.json(savedContact)
//     })
// })

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const contactData = new Person({
      name: body.name,
      number: body.number 
    })
  
    contactData.save().then(savedNote => {
      response.json(savedNote)
    })
  })

app.get('/info', (request, response) => {
    const amount = Person.length
    const time = new Date()
    console.log(time)
    response.send(`<p>Phonebook has info for ${amount} people</p>
    <p>${time}</p>
    `)
    
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})