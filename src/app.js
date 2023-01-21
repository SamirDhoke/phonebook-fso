const express = require('express');
const cors = require('cors');
const utils = require('./utils.js');
const mainRouter = require('./routes/main.js');
const data = require('./data.js');

const bodyParser = express.json();

const app = express()

app.use(cors())
app.use(bodyParser)

if (process.env.NODE_ENV !== 'PROD') {
	app.use(utils.logger)
}

app.use(express.static('dist'))

app.use('/api', mainRouter);
app.get('/info', (req, res, next) => {
	const date = new Date;
	const datestring = date.toLocaleString('en', {timeZone: 'America/New_York'});
	res.send(`
		<p>phonebook has information of ${data.getAll().length} people</p>
		<p>${datestring}</p>
	`)
})

app.use(utils.unknownRoute)


module.exports = app;