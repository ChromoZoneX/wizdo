var express = require('express');
var router = express.Router();
var sets = require('simplesets');

var Questiondata = require('../models/questiondata').QuestionData;
var Answers = require('../models/answers').Answers;

/* Retrieve a Question */
router.post('/', function(req, res) {
    var username = req.body.username;
    var index = 0;
    
    // gen set of questions answered by users. Stored in userQuestions
    Answers.where({username : username  }).findOne( function(err, answersList){
        var randomQuestion;
        if(!err) {
            if(answersList) {
		console.log(answersList);
                var answeredArr = new sets.Set(answersList.q_ids);
                Questiondata.where({username : { $ne : username } }).find( function(err, dataArr){
                    if(!err && dataArr.length > 0) {
                        var blquestion_found = false;
                        for ( var i = 0; i < dataArr.length; i++ ) {
                            var rand = Math.floor((Math.random() * dataArr.length));
                            if (!answeredArr.has(dataArr[rand].q_id)){
                                blquestion_found = true;
                                res.json(201, {message: "An unanswered question was found. " + dataArr[rand].q_id, question: dataArr[rand]});
                                break;
                            }                         
                        }
                        if(!blquestion_found){
                            res.json(201, {message: "No unanswered questions found. ", question: null});  
                        }
                         
                    } else if(!err && dataArr.length == 0) {
                        res.json( 200, { message : "Empty" });
                    } else {
                        res.json(500, {message: "Could not get question. Error: " + err});
                    }                            
                        }
                ); 
            } else {
                Questiondata.where({username : { $ne : username } }).findOne( function(err, dataObj){
                    if(dataObj)
                        res.json(201, {message: "An unanswered question was found. " + dataObj.q_id, question: dataObj });
                    else
                        res.json(201, {message: "No unanswered questions was found. ", question: null});
                }); 
            }
             
        }
        else {
            res.json(500, {message: "Could not answers list. Error: " + err});
        }
    });
       
});

module.exports = router;
