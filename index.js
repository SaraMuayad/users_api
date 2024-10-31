const express = require('express');
const bodyParser = require('body-parser');
const  fs = require('fs')



const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());


const  users = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`))
// Routes


// Get all posts
app.get('/api/v1/users', (req, res) => {
  // res.json(users);


  res.status(200).json({
    message: 'sucess',
    results: users.length,
    data :{
        users
    }
  })
});

// Get a single post by id

app.get('/api/v1/users/:id',(req, res) => {

  const id = req.params.id * 1
  const user = users.find(el =>el.id === id) 
  if(!user){
    return res.status(404).json({
        status: 'fail',
        message: 'Invaild ID'
    })
}


  res.status(200).json({
    status:'success',
    
 results:users.length,
    data: {
        users :user
    }
})

  
  
  
})


// app.get('/api/v1/users/:id', (req, res) => {
//   const userId = parseInt(req.params.id);
//   const user = users.find(p => p.id === userId);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: 'data not found' });
//   }
// });

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