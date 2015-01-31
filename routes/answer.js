var express = require('express');
var router = express.Router();

var Questiondata = require('../models/questiondata').Questiondata;
var Answers = require('../models/answers').Answers;

/* Retrieve a Question */
router.get('/retrievequestion', function(req, res) {

    var newQuestiondata = new Questiondata();
    console.log("1");
    
    rand = Math.random();
    Questiondata.find().limit(-1).skip(rand).next();
    console.log("2");
    newQuestiondata.find({ q_ids: QuestionData.q_id }).select({q_ids: QuestionData.q_id});
    console.log("3");
    if (QuestionData.size >= 0){
        res.json(200, { data : newQuestiondata });
    }
    else {
        res.json(500, { message: "No Questions :("});
    }
});

/* Post QuestionID into user's list of Answered Questions */
router.post('/questionlistdb', function(req, res) {
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




