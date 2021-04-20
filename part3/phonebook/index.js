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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if( error.name === 'CastError') {
    return response.status(400).send({error: 'malformated id'})
  }

  next(error)
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(data => {
        response.json(data)
    })
})


app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(res => {
        response.json(res)
    })
  })


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(result => {
      response.status(204).end()
  })
  .catch(error => next(error))
})

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

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const contact = {
 
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, contact, { new: true })
  .then(updatedContact => {
      response.json(updatedContact)
  }).catch(error => {
    next(error)
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

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})