var express = require('express');

var router = express.Router();

var answers = require('../models/answers').Answers;

router.post('/', function(req, res) {
	var uname = req.body.username;	
	answers.find({ username : uname }, function(err, docs) {
		if(!err) {
			if(docs.length > 0)	
				res.json( 200, { message : docs[0] });
			else
				res.json( 200, { message : 'Empty' });
		} else {
			res.json( 500, { message : err });
		}
	});
});
module.exports = router;
