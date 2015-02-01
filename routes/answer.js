var express = require('express');
var router = express.Router();

var Questiondata = require('../models/questiondata').Questiondata;
var Answers = require('../models/answers').Answers;

/* Retrieve a Question */
router.get('/retrievequestion', function(req, res) {
    
    //var newQuestiondata = new Questiondata();
    
    //res.json(200, { "data" : "newQuestiondata" });
    
    var bigDoc;
    var query = Questiondata.find({}, function(err, doc){
        bigDoc = doc;
        if(!err && doc !== null) {
            //do nothing
        } else {
          //res.json(500, {message: "Could not get question. Error: " + err});
        } 
    });
    
    var rand = Math.floor((Math.random() * bigDoc.size));
        console.log("1");
    while ($.inArray(bigDoc[rand][0], categories) >= 0){ //returns -1 if not found
        rand = Math.floor((Math.random() * 10));
    }

    
    res.json(200, {message: bigDoc[rand]});
    
    //.limit(-1).skip(rand).next();
    /*
    console.log(query);
    if ( query === null ){
        res.json(500, { message: "No Questions :("});
    }
    else{
        res.json(200, { data : query });
    }
    
    console.log("2");
    newQuestiondata.find({ q_ids: QuestionData.q_id }).select({q_ids: QuestionData.q_id});
    console.log("3");
    if (QuestionData.size >= 0){
        res.json(200, { data : newQuestiondata });
    }
    else {
        res.json(500, { message: "No Questions :("});
    }*/
    
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




