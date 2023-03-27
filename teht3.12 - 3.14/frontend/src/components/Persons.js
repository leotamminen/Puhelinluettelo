const Person = ({ name, number, deletePerson }) => {
  return (
    <p> {name} {number}
      <button onClick={deletePerson}>delete</button> </p>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.filterPersons.map(person =>
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          deletePerson={() => props.deletePerson(person.id)}
        />
      )}
    </div>
  )
}

export default Persons