const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Please provide password as an argument');
    process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://FullstackOpenCurriculum:${password}@cluster0.awzvf.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){
const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

person.save().then(result => {
    console.log(`Person ${person.name} has been added`)
    mongoose.connection.close()
})
} else if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
}