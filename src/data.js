const dataManager = () => {
  return {
    delete: (id) => {
      persons = persons.filter(p => p.id !== id)
    },
    getAll: () => persons,
    getBy: function (label, value) {      
      return persons.find(p => p[label] === value) 
    },
    getById: function (id) {
      const self = this;
      return self.getBy('id', id)
    },
    add: (person) => {
      const newPerson = {
        id: Math.round(Math.random() * 100) + 1,
        name: person.name,
        number: person.number
      }
      persons = persons.concat(newPerson);
      return newPerson;
    }
  }
}

let dataManagerInstance = null;

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];


if (!dataManagerInstance) {
  dataManagerInstance = dataManager();
}

module.exports = dataManagerInstance;