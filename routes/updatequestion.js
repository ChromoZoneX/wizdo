var express = require('express');
var router = express.Router();

var QuestionData = require('../models/questiondata').QuestionData;
var Answers = require('../models/answers').Answers;


router.post('/', function(req, res) {
    var uname = req.body.username;
    var questionAskedId = req.body.questionId;
    var Answer = req.body.answer;

    var query = { q_id : questionAskedId};
    var newData;
    if (Answer === 'Yes') {
        newData = {$inc: {"yes": 1}};
    } else {
        newData = {$inc: {"no": 1}};
    }
    
    var yes, no;
    QuestionData.findOneAndUpdate(query, {$inc: {"yes": 1}}, {upsert:false}, function(err, doc){
        if (err) return res.send(500, { error: "Question does not exist" });
        //return res.send("succesfully saved");
        yes = doc.yes;
        no = doc.no;
    });
    
    //append the q_id of the question object to the questions array
      var query = Answers.where({ username: uname });
      query.findOne(function(err,docs) {
        if (docs) {
          var q_ids = docs.q_ids;
          q_ids.push(questionAskedId);
          query.update({ $set: { q_ids: questionAskedId }},function(err){
            if(!err)
              res.json(201, {message: "Question placed in Answer list: " + questionAskedId + " No: "+no+" Yes: "+yes}); 
          });
        } else {
          var newAnswersObject = new Answers();
          newAnswersObject.username = uname;
          newAnswersObject.q_ids = [questionAskedId];
          newAnswersObject.save(function(err) {
            if(!err)
              res.json(201, {message: "Question placed in new Answer list: " + questionAskedId + " No: "+no+" Yes: "+yes}); 
          });
        }            
      });
    
});

module.exports = router;