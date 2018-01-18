'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating mongoose.schema instance, that takes object tht shows 
// the shape of your DB entries.
var CommentsSchema = new Schema ({
  author: String,
  text: String
})

// Export models
module.exports = mongoose.model('Comment', CommentsSchema);
