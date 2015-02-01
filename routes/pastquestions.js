var express = require('express');

var router = express.Router();

// var questions = require('../models/questions').Questions;
var QuestionData = require('../models/questiondata').QuestionData;

router.post('/', function(req, res) {
	var uname = req.body.username;	
	QuestionData.find({ username : uname }, function(err, docs) {
		if(!err) {
			if(docs.length > 0)
				res.json( 200, { message : docs });
			else
				res.json( 200, { message : 'Empty' });
		} else {
			res.json( 500, { message : err });
		}
	});
});
module.exports = router;
