var express = require('express');
var router = express.Router();

var Accountdata = require('../models/accountdata').Accountdata;

/* POST Signup Data */
router.post('/', function(req, res) {
  var uname = req.body.username; // Name of workout. 
  var pword = req.body.password;  // Description of the workout

  //Workout.findOne({ name: workout_name }, function(err, doc) {  // This line is case sensitive.
  // Case Insensitive RegEx Search
  Accountdata.findOne({ name: { $regex: new RegExp(uname, "i") } }, function(err, doc) {  
    if(!err && !doc) {
      
      var newAccountdata = new Accountdata(); 

      newAccountdata.username = uname; 
      newAccountdata.password = pword; 
      
      newAccountdata.save(function(err) {

        if(!err) {
          res.json(201, {message: "Account: " + newAccountdata.username + " was created." });    
        } else {
          res.json(500, {message: "Could not create account. Error: " + err});
        }

      });

    } else if(!err) {
      //Trying to use a taken username
      res.json(403, {message: "Account already exists"}); 
    } else {
      res.json(500, { message: err});
    } 
  });

});

module.exports = router;

