const morgan = require('morgan');

morgan.token('response-body', function (req, res) {
	return JSON.stringify(req.body)
})

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :response-body');

const unknownRoute = (req, res) => {
	res.status(404).send('resource not found');
}

module.exports = { logger, unknownRoute };