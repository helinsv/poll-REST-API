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
	const schema = {
		answer: Joi.string().min(3).required()
	};

	const result = Joi.validate(req.body, schema);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}

	const answer = {
		id: answers.length + 1,
		answer: req.body.answer,
		votes: 0
	};

	answers.push(answer);
	res.send(answer);
});



/*app.get('/api/courses/:id', (req, res) => {	
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if(!course) res.status(404).send('404');
	res.send(course.name);
})*/



//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listerning on port " + port +"..."));

