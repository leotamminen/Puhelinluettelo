const mongoose = require('mongoose')

const password = process.argv[2]
const nameToBeAdded = process.argv[3]
const numToBeAdded = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.i9hi2yo.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// If given only two command line arguments, no password
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

// If given only password as a command line argument.
else if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

// Only 4 arguments.
else if (process.argv.length === 4) {
    console.log('Invalid argument, add number as the fifth argument.')
    process.exit(1)
}

// If given name and number as a command line argument (total of 5).
else if (process.argv.length === 5) {
    const personFromCommandLine = new Person({
        name: nameToBeAdded,
        number: numToBeAdded,
    })
    personFromCommandLine.save().then(result => {
        console.log(`added ${nameToBeAdded} number ${numToBeAdded} to phonebook`)
        mongoose.connection.close()
    })
}

// Too many arguments
else if (process.argv.length > 5) {
    console.log('Invalid argument, too many arguments given.')
    process.exit(1)
}