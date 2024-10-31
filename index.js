const express = require('express');
const bodyParser = require('body-parser');
const  fs = require('fs')



const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Mock database
// let users = [
//   { id: 1,  firstname:"Sara",lastname:"Muayad", job_title: "Softwate Engineer", age:26,},
//   { id: 2,  firstname:"Rayan",lastname:"Ibrahim", job_title: "Programmer", age:24,},
//   { id: 3,  firstname:"Sana",lastname:"Jaff",  job_title: "Artiest", age:28,},
//   { id: 4,  firstname:"Shayma",lastname:"Karwan",  job_title: "Techer", age:30,},
// ];

const  users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`))
// Routes

// Get all posts
app.get('/users', (req, res) => {
  res.json(users);
});

// Get a single post by id
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(p => p.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Create a new post
app.post('/users', (req, res) => {
  const newPost = {
    id: users.length + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    job_title: req.body.job_title,
    age:req.body.age
  };
  users.push(newPost);
  res.status(201).json(newPost);
});

// Update a post by id
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const  user = users.find(p => p.id === userId);
  if (user) {  
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.job_title = req.body.job_title;
    user.age = req.body.age;

    res.json(user);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Delete a post by id
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(p => p.id !== userId);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});