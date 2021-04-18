require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to URL')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(res => {
    console.log('Connected to MongoDB')
})
.catch(error => {
    console.log('Error occured: ', error.message)
})

const personSchema = new mongoose.Schema({
    Name: String,
    Number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

