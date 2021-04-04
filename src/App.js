import React, { useState, useEffect } from 'react'
import noteService from "./services/notes"

const Person = ({person, onDelete}) => {
  return (
    <div>{person.name}<button onClick={() => onDelete(person.id)}>delete</button></div>
  );
}

const App = () => {
  // console.log(noteService.getAll());
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  useEffect(() => {
    noteService
      .getAll()
      .then((data) => {
        setPersons(data);
      });
  }, []);

  const onChange = (event) => {
    setNewName(event.target.value);
  }
  const onClick = (event) => {
    event.preventDefault();
    noteService
      .addPerson(newName, 0)
      .then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
      })
  }
  const onDelete = (id) => {
    const result = window.confirm("delete?");
    if (result) {
      noteService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        name: <input value={newName} onChange={onChange} />
      </div>
      <div>
        <button type="submit" onClick={onClick} >add</button>
      </div>
      <h2>Numbers</h2>
      {persons.map((person) => <Person person={person} onDelete={onDelete} key={person.id} />)}
    </div>
  )
}

export default App
