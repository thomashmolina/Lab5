var express = require('express');
var router = express.Router();
/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useMongoClient: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});
/* GET home page. */
router.post('/comment', function(req, res, next) {
    console.log(req.body);
    console.log("POST comment route");
    var newcomment = new Comment(req.body);
    console.log(newcomment);
    newcomment.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});
/* GET comments from database */
router.get('/comment', function(req, res, next) {
    console.log("In the GET route?");
    console.log(req.query)
    var requestName = req.query["q"];
    console.log(requestName);
    var obj = {};
    if (requestName) {
        obj = { Name: requestName }
    }
    Comment.find(obj, function(err, commentList) { //Calls the find() method on your database
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(commentList); //Otherwise console log the comments you found
            res.json(commentList); //Then send the comments
        }
    })
});
router.delete('/comment', function(req, res, next) {
    Comment.find().remove(function() {
        res.sendStatus(200);
    });
})

module.exports = router;
