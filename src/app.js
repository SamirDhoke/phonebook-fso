const express = require('express');
const cors = require('cors');
const utils = require('./utils.js');
const Person = require('./models.js');
const mainRouter = require('./routes/main.js');
// const data = require('./data.js');

const bodyParser = express.json();

const app = express()

app.use(cors())
app.use(bodyParser)

if (process.env.NODE_ENV !== 'PROD') {
	app.use(utils.logger)
}

app.use(express.static('dist'))

app.use('/api', mainRouter);
app.get('/info', async (req, res, next) => {
	try {
	
		const date = new Date;
		const datestring = date.toLocaleString('en', {timeZone: 'America/New_York'});
		const people = await Person.find({});

		res.send(`
			<p>phonebook has information of ${people.length} people</p>
			<p>${datestring}</p>
		`)
	
	} catch (e) {
	
		next(e);
	
	}
})

app.use(utils.unknownRoute)
app.use(utils.errorHandler)
app.use((error, req, res) => {
	// only internal server error handler
	res.status(500).json({
		error: 'Internal server error'
	})
})

module.exports = app;