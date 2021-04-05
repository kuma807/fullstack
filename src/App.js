import React, { useState, useEffect } from 'react'
import noteService from "./services/notes"

const Person = ({person, onDelete}) => {
  return (
    <div>{person.name}<button onClick={() => onDelete(person.id)}>delete</button></div>
  );
}

const Erro = ({text}) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    borderColor: 'green',
    borderStyle: 'solid',
    fontStyle: 'italic',
    fontSize: 16,
    marginBottom: 10
  }
  if (text.length === 0) {
    return null;
  }
  else {
    return (
      <div style={successStyle}>
        {text}
      </div>
    );
  }
}

const App = () => {
  // console.log(noteService.getAll());
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newErro, setNewErro ] = useState('');
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
        setNewErro(`Added ${newName}`);
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
      <Erro text={newErro} />
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
