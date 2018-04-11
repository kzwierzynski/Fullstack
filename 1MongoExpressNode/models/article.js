const mongoose = require('mongoose');

//Article Schema
let articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true    
    },
    author: {
        type: String,
        required: true    
    },
    body: {
        type: String,
        required: true    
    }
});

// the schema is useless so far
// we need to create a model using it
let Article = mongoose.model('Article', articleSchema);

// make this available to our users in our Node applications
module.exports = Article;

// let Article = module.exports = mongoose.model('Article', articleSchema);