const router = require('express').Router();
const Person = require('../models.js');
const data = require('../data.js');

router.get('/persons', (req, res, next) => {
	// res.json(data.getAll());
  Person
    .find()
    .then(people => res.json(people))
    // .catch(e => res.status(500).json({ error: 'Something went wrong' }))
    .catch(e => next(e))
})

router.get('/persons/:id', (req, res, next) => {
  const id = req.params.id;
  // const personId = Number(id);

  // console.log('param id', typeof(personId), personId);

  // const person = data.getById(personId);
  Person
    .findById(id)
    .then(person => res.json(person))
    .catch(e => {
      // res.status(500).json({ error: 'Something went wrong' })
      // console.log('[Error]', e.message);
      next(e)
    })
// 
//   if (person) {
//     res.json(person);
//   } else {
//     // res.status(404).send('no resource found')
//     next()
//   }
})


router.delete('/persons/:id', (req, res, next) => {
  const id = req.params.id;
  // const personId = Number(id);
  // data.delete(personId)

  Person
    .findByIdAndRemove(id)
    .then(result => {
      res.status(204).end();
    })
    // .catch(e => res.status(500).end())
    .catch(e => next(e))
})


router.post('/persons', async (req, res, next) => {
  const body = req.body;

  try {

    const { number='', name='' } = body;

    // if (!(number && name)) {      
    //   const err = new Error('name or number is missing');
    //   err.name = 'MalformattedInputError'
    //   throw err;
    // }

    const existing = await Person.findOne({ name: name })

    // console.log(existing);

    if ( existing ) {

      const updated = await Person.findByIdAndUpdate(existing.id, { number }, { new: true, runValidators: true });
      res.json(updated);

    } else {
      // const result = data.add(body)
      const person = new Person({
        name,
        number
      });

      const saved = await person.save()
      res.status(201).json(saved)
    }

  } catch (e) {
    next(e)
  }

})

module.exports = router;