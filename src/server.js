'use strict'
// dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// models
var Comment = require('./models/comments')

// Creating instances
var app = express();
var router = express.Router();

// Set up port
var port = process.env.API_PORT || 3600;

// Env variables
require('dotenv').config();

// Configure API to use bodyParser, and look for JSON data in request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting headers to allow CORS with middleware 
// (to prevent errors from Cross Origin Resource Shairing)
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader('Cache-Control', 'no-cache') // removes caching, so you get most recent comments
  next();
})

router.get('/', function(req, res) {
  res.json({ message: `API initialized!`});
})

router.route('/comments')
  .get(function(req, res) {
    Comment.find(function(err, comments){
      if(err) res.send(err);
      res.json(comments); //responds with a json object of our database comments.
    });
  })
  
  .post(function(req, res){
    var comment = new Comment();
    // body.parser lets us use the req.body
    comment.author = req.body.author;
    comment.text = req.body.text;
    comment.save(function(err) {
      if(err) res.send(err);
      res.json({ message: 'Comment successfully added! '});
    });
  });

router.route('/comments/:commentId')
  .put(function(req, res) {
    Comment.findById(req.params.commentId, function(err, comment) {
      if(err) res.send (err);
      (req.body.author) ? comment.author = req.body.author : null;
      (req.body.text) ? comment.text = req.body.text : null;
      // saving updates
      comment.save(function(err) {
        if(err) res.send(err);
        res.json({ message: 'Comment successfully updated! '});
      });
    })
  })

  .delete(function(req, res) {
    Comment.remove({ _id: req.params.commentId }, function(err, comment){
      if(err) res.send(err);
      res.json({ message: 'Comment successfully deleted! '});
    })
  })

// So that the router config is used when you call /api 
app.use('/api', router);

// Starting up server and listening for requests on port
app.listen(port, function() {
  console.log(`API running on port ${port}`)
})

//db config
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;

mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@ds153577.mlab.com:53577/${DB_NAME}`
  // The bactick and dollar sign way of getting values from varialbles is Template Literals 
)

