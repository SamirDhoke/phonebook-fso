const morgan = require('morgan');

// this is how you register a custom token.
morgan.token('response-body', function (req, res) {
	return JSON.stringify(req.body)
})

// this is how you create a logger with a template of HOW IT WILL LOG.
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :response-body');


const unknownRoute = (req, res) => {
	res.status(404).send('route not found');
}


const errorHandler = (error, req, res, next) => {
	console.log(error.name, error.message);
	// types of errors so far
	/*
	MalformattedInputError - when the input is invalid
	CastError - when the ID is invalid
	ValidationError - when the validation fails
	Rest - internal server error
	*/

	if (error.name === 'CastError') {
		return res.status(400).json({ error: 'the input is invalid' })
	}

	if (error.name === 'MalformattedInputError') {
		return res.status(400).json({ error: error.message || 'the input data is invalid' })	
	}

	if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message || 'input validation failed' })	
	}

	next(error)
}

module.exports = { logger, unknownRoute, errorHandler };