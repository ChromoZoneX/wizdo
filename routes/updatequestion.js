var express = require('express');
var router = express.Router();

var QuestionData = require('../models/questiondata').QuestionData;
var Answers = require('../models/answers').Answers;


router.post('/', function(req, res) {
    var uname = req.body.username;
    var questionAskedId = req.body.questionId;
    var answer = req.body.answer;

    var query = { q_id : questionAskedId};
    var newData;
    if (answer === 'yes') {
        newData = {$inc: {yes: 1}};
    } else {
        newData = {$inc: {no: 1}};
    }
    
    var yes, no;
    QuestionData.findOneAndUpdate(query, newData, {upsert:false}, function(err, doc){
        if (err || !doc) return res.send(500, { error: "Question does not exist" });
        //return res.send("succesfully saved");
        yes = doc.yes;
        no = doc.no;

        var query2 = Answers.where({ username: uname });
        query2.findOne(function(err,docs) {
            if (docs) {
                var q_ids = docs.q_ids;
                q_ids.push(questionAskedId);
                query2.update({ $set: { q_ids: q_ids }},function(err){
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
    
    //append the q_id of the question object to the questions array
    
    
});

module.exports = router;
