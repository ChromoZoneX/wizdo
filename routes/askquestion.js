var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var QuestionData = require('../models/questiondata').QuestionData;
var Questions = require('../models/questions').Questions;
/* Post a Question */
router.post('/', function(req, res) {
    var q_id = crypto.randomBytes(20).toString('hex');
    var question = req.body.question;
    var username = req.body.username;

  QuestionData.findOne({ q_id: { $regex: new RegExp(q_id, "i") } }, function(err, doc) {
    if(!err && !doc) {
      
      //create a new question object
      var newQuestionData = new QuestionData(); 
      newQuestionData.q_id = q_id;
      newQuestionData.question = question;
      newQuestionData.yes = 0;
      newQuestionData.no = 0;
      newQuestionData.timestamp = new Date().toString();
      
      //save the question object
      newQuestionData.save(function(err) {

        if(!err) {
          //append the q_id of the question object to the questions array
          var query = Questions.where({ username: username });
          query.findOne(function(err,docs) {
            console.log("doc: " + docs);
            if (docs) {
              var q_ids = docs.q_ids;
              q_ids.push(q_id);
              query.update({ $set: { q_ids: q_ids }},function(err){
                if(!err)
                  res.json(201, {message: "Question was created: " + q_id }); 
              });
            } else {
              var newQuestionsObject = new Questions();
              newQuestionsObject.username = username;
              newQuestionsObject.q_ids = [q_id];
              newQuestionsObject.save(function(err) {
                if(!err)
                  res.json(201, {message: "Question was created: " + q_id }); 
              });
            }            
          });
             
        } else {
          res.json(500, {message: "Could not create question. Error: " + err});
        }

      });

    } else if(!err) {
      // User Question already exists 
      res.json(403, {message: "Question Id Already Exists."}); 

    } else {
      res.json(500, { message: err});
    } 
  });
});

module.exports = router;