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

/* Post QuestionID into user's list of Answered Questions
   And update the question with the users choice          */
router.post('/updatequestion', function(req, res) {
    var uname = req.body.username;
    var questionAskedId = req.body.questionId;

  Questiondata.findOne({ question: { $regex: new RegExp(questionAsked, "i") } }, function(err, doc) {
    if(!err && !doc) {
      
      var newQuestiondata = new Questiondata(); 
      newQuestiondata.name = questionAsked;
      
      newQuestiondata.save(function(err) {

        if(!err) {
          res.json(201, {message: "Question was created: " + newQuestiondata.id });    
        } else {
          res.json(500, {message: "Could not create question. Error: " + err});
        }

      });

    } else if(!err) {
      // User Question already exists 
      res.json(403, {message: "Question Already Exists."}); 

    } else {
      res.json(500, { message: err});
    } 
  });
});

module.exports = router;




