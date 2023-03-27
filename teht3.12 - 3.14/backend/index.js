require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))

app.get('/info', (req, res) => {
    const handlingTime = new Date()
    Person.find({})
    .then(persons => res.send(`<p> Phonebook has info for ${persons.length} people <br/> <p>${handlingTime} </p >`))
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
      })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(persons => {
        response.json(persons)
      })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
})

const randomId = () => {
    // random integer from 0 to 1000
    const randId = Math.floor(Math.random() * 1001)
    return randId
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }

    if (body.number === undefined) {
        return response.status(400).json({ error: 'number missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: randomId()
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})