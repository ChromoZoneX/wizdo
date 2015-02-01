var express = require('express');
var router = express.Router();

var Questiondata = require('../models/questiondata').Questiondata;
var Answers = require('../models/answers').Answers;

/* Retrieve a Question */
router.get('/retrievequestion', function(req, res) {
    var uname = req.body.username;
    
    var bigDoc;
    var query = Questiondata.find({}, function(err, doc){
        if(!err && doc.length > 0) {
            var rand = Math.floor((Math.random() * doc.length));
            
            var query2 = Answers.find({username : uname} , function(err, userQuestions){
                //While string is in the question array
                while ($.inArray(doc[rand][0], userQuestions[1]) >= 0){ //returns -1 if not found
                    rand = Math.floor((Math.random() * doc.length));
                }
            
                res.json(200, {message: bigDoc[rand]});
            });
            
        } else {
          res.json(500, {message: "Could not get question. Error: " + err});
        } 
    });
});

module.exports = router;