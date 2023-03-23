import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])

  const [filterValue, setFilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const filterPersons = filterValue.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()) === true)
    : persons

  const hook = () => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(`Added ${newName}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePersonWithId = (id) => {
    const personToBeDeleted = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToBeDeleted.name}`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage(`Deleted ${personToBeDeleted.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage}/>

      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons filterPersons={filterPersons} deletePerson={deletePersonWithId} />
    </div>
  )
}

export default App