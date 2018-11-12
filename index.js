const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const answers = [
	{ 
		id: 1, 
		answer:'Заленський',
		votes: 0
	},
	{ 
		id: 2, 
		answer:'Порошенко',
		votes: 0
	},
	{ 
		id: 3, 
		answer:'Вакарчук',
		votes: 0
	},
];


app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.get('/api/answers', (req, res) => {
	res.send(answers);
});

app.post('/api/answers', (req, res) => {
	const { error } = validateAnswers(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const answer = {
		id: answers.length + 1,
		answer: req.body.answer,
		votes: 0
	};

	answers.push(answer);
	res.send(answer);
});

app.put('/api/answers/:id', (req, res) => {
	const answer = answers.find(c => c.id === parseInt(req.params.id));
	if(!answer) return res.status(404).send('The answer with the given ID was not found');

	const { error } = validateAnswers(req.body);
	if (error) return res.status(400).send(error.details[0].message);


	answer.answer = req.body.answer;
	res.send(answer);
});

app.delete('/api/answers/:id', (req, res) => {
	const answer = answers.find(c => c.id === parseInt(req.params.id));
	if(!answer) return res.status(404).send('The answer with the given ID was not found');

	const index = answers.indexOf(answer);
	answers.splice(index, 1);
	res.send(answer);
});


app.get('/api/answers/:id', (req, res) => {
	const answer = answers.find(c => c.id === parseInt(req.params.id));
	if(!answer) return res.status(404).send('The answer with the given ID was not found');
	res.send(answer);
});

function validateAnswers(answers){
	const schema = {
		answer: Joi.string().min(3).required()
	};

	return Joi.validate(answers, schema);
}


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listerning on port " + port +"..."));

