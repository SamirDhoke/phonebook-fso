if (NODE_ENV !== 'PROD') {
	require('dotenv').config();
}

const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

// create a schema
const Schema = mongoose.Schema;
const personSchema = new Schema({
	name: String,
	number: String
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// create a model
const Person = mongoose.model('Person', personSchema);

const MONGO_URL = `mongodb+srv://private_application:${process.env.MONGO_APP_PASSWORD}@cluster0.i6eur.mongodb.net/?retryWrites=true&w=majority`;

// const generateConnString = (password) => {
// 	return `mongodb+srv://private_application:${process.env.MONGO_APP_PASSWORD}@cluster0.i6eur.mongodb.net/?retryWrites=true&w=majority`;
// }


(async function () {

	try {

		await mongoose.connect(MONGO_URL);
		console.log('Connection Successful.')
		
		if (process.argv.length > 3) {
			// add a record
			const name = process.argv[2];
			const number = process.argv[3];

			const person = new Person({
				name, number
			})

			await person.save();

			console.log('added', name);
			
		} else if (process.argv.length > 2) {

			// search by the name
			const name = process.argv[2];
			const person = await Person.findOne({
				name
			});

			if (person) {
				console.log('Got', person.name);
			} else {
				throw new Error("no such person found!")
			}

		} else {
			// get all the records
			const people = await Person.find({});
			console.log('Phonebook')
			console.log('---')
			people.forEach(person => console.log(person.name, person.number))

		}				

	} catch(e) {
		console.log(e.message)
	}	

	await mongoose.connection.close();

})()