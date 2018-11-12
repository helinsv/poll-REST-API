const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const questions = [{
	id: '1',
	question: 'hto stane novum zlodiem?',
	answers: [
		{
			id: '1',
			answer: 'zelensky',
			votes: 1
		},
		{
			id: '2',
			answer: 'poroshenko',
			votes: 2
		},
		{
			id: '3',
			answer: 'vakarchyk',
			votes: 3
		},
	],
}];

app.get('/api/questions', (req, res) => {
	res.send(questions);
});

app.post('/api/questions', (req, res) => {
	const { error } = validateQuestions(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const question = {
		id: questions.length + 1,
		question: req.body.question,
		answers: [
			{
				id: 1,
				answer: req.body.answers[0].answer,
				votes: 0
			},
			{
				id: 2,
				answer: req.body.answers[1].answer,
				votes: 0
			},
			{
				id: 3,
				answer: req.body.answers[2].answer,
				votes: 0
			},
		]
	};

	questions.push(question);
	res.send(question);
});

app.put('/api/questions/:id', (req, res) => {
	const answer = questions.find(c => c.id === parseInt(req.params.id));
	if (!answer) return res.status(404).send('The answer with the given ID was not found');

	const { error } = validateQuestions(req.body);
	if (error) return res.status(400).send(error.details[0].message);


	answer.answer = req.body.answer;
	res.send(answer);
});

app.delete('/api/questions/:id', (req, res) => {
	const question = questions.find(c => c.id === parseInt(req.params.id));
	if (!question) return res.status(404).send('The question with the given ID was not found');

	const index = questions.indexOf(question);
	questions.splice(index, 1);
	res.send(question);
});


app.get('/api/questions/:id', (req, res) => {
	const question = questions.find(c => c.id === parseInt(req.params.id));
	if (!question) return res.status(404).send('The question with the given ID was not found');
	res.send(question);
});

function validateQuestions(questions) {
	const schema = {
		question: Joi.string().min(3).required(),
		answers: Joi.array()
	};

	return Joi.validate(questions, schema);
}


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listerning on port " + port + "..."));
