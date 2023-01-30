if (process.env.NODE_ENV !== 'PROD') {
	require('dotenv').config();
}

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.set('strictQuery', true);

const MONGO_URL = `mongodb+srv://private_application:${process.env.MONGO_APP_PASSWORD}@cluster0.i6eur.mongodb.net/?retryWrites=true&w=majority`;

mongoose
	.connect(MONGO_URL)
	.then(() => console.log('Connection to db successful.'))
	.catch(e => console.log(e.message));

// create a schema

const personSchema = new Schema({
	name: {
		type: String,
		minLength: [3, 'The name must be at least 3 characters long.'],
		required: [true, 'User name is required']
	},
	number: {
		type: String,
		minLength: 11,
		validate: {
			validator: function (v) {
				return /\d{3}-\d{3}-\d{4}/.test(v);
			},
			message: 'Number is not properly formatted.'
		},
		required: [true, 'User phone is required']
	}
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// create a model

module.exports = mongoose.model('Person', personSchema);