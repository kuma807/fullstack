const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('context', (req, res) => {
  return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :context'))

let phonebook = {
  "persons": [
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "daf",
      "number": 0,
      "id": 6
    },
    {
      "name": "fasdf",
      "number": 0,
      "id": 8
    },
    {
      "name": "fad",
      "number": 0,
      "id": 9
    }
  ]
}

app.get('/api/persons', (request, response) => {
  response.json(phonebook.persons);
})

app.get('/info', (request, response) => {
  response.send(`
    <div>Phonebook has info for ${phonebook.persons.length} people</div>
    <div>${Date.now()}</div>
    `
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.persons.filter((p) => p.id === id)
  if (person.length !== 0) {
    response.json(person[0])
  }
  else {
    response.status(404).end()
  }
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook.persons = phonebook.persons.filter((p) => p.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = phonebook.persons.length > 0
    ? Math.max(...phonebook.persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }
  if (phonebook.persons.filter((p) => p.name === body.name).length !== 0) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  phonebook.persons = phonebook.persons.concat(person)

  response.json(phonebook.persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
