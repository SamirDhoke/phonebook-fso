const router = require('express').Router();
const data = require('../data.js');

router.get('/persons', (req, res) => {
	res.json(data.getAll());
})

router.get('/persons/:id', (req, res, next) => {
  const id = req.params.id;
  const personId = Number(id);

  // console.log('param id', typeof(personId), personId);

  const person = data.getById(personId);

  if (person) {
    res.json(person);
  } else {
    // res.status(404).send('no resource found')
    next()
  }
})


router.delete('/persons/:id', (req, res, next) => {
  const id = req.params.id;
  const personId = Number(id);
  
  data.delete(personId)

  res.status(204).end();  
})


router.post('/persons', (req, res, next) => {
  const body = req.body;

  const { number='', name='' } = body;

  if (!(number && name)) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  if (data.getBy('name', name)) {
    return res.status(400).json({ error: 'a person with this name already exists' }) 
  }
  
  const result = data.add(body)

  res.status(201).json(result);  
})

module.exports = router;