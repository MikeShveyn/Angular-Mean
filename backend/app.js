const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers',
    "Origin,X-Request-Width, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET,POST, PATCH, DELETE, OPTIONS");
  next();
})

app.post("/api/posts", (req, res, next)=> {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'dasdasd',
      title: 'First server post',
      content: 'First server post'
    },
    {
      id: 'f4b54545',
      title: 'Second server post',
      content: 'Second server post'
    }
    , {
      id: 'dv54545',
      title: 'Third server post',
      content: 'Third server post'
    }
  ]
  res.status(200).json({
    message: 'Post fetched successfully!',
    posts: posts
  });

});

module.exports = app;
