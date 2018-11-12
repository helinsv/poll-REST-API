const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const questions = [
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

app.get('/api/questions', (req, res) => {
	res.send(questions);
});

app.post('/api/questions', (req, res) => {
	const { error } = validateQuestions(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const answer = {
		id: questions.length + 1,
		answer: req.body.answer,
		votes: 0
	};

	questions.push(answer);
	res.send(answer);
});

app.put('/api/questions/:id', (req, res) => {
	const answer = questions.find(c => c.id === parseInt(req.params.id));
	if(!answer) return res.status(404).send('The answer with the given ID was not found');

	const { error } = validateQuestions(req.body);
	if (error) return res.status(400).send(error.details[0].message);


	answer.answer = req.body.answer;
	res.send(answer);
});

app.delete('/api/questions/:id', (req, res) => {
	const answer = questions.find(c => c.id === parseInt(req.params.id));
	if(!answer) return res.status(404).send('The answer with the given ID was not found');

	const index = questions.indexOf(answer);
	questions.splice(index, 1);
	res.send(answer);
});


app.get('/api/questions/:id', (req, res) => {
	const answer = questions.find(c => c.id === parseInt(req.params.id));
	if(!answer) return res.status(404).send('The answer with the given ID was not found');
	res.send(answer);
});

function validateQuestions(questions){
	const schema = {
		answer: Joi.string().min(3).required()
	};

	return Joi.validate(questions, schema);
}


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listerning on port " + port +"..."));

