var express = require('express');
var router = express.Router();

var Questiondata = require('../models/questiondata').Questiondata;

/* Post a Question */
router.post('/questiondb', function(req, res) {
    var questionAsked = req.body.question;

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

/* Post QuestionID into user's list of asked Questions */
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




