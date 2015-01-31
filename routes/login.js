var express = require('express');
var router = express.Router();

var Accountdata = require('../models/accountdata').Accountdata;

/* Login Attempt */
router.get('/', function(req, res) {
    var uname = req.body.username;
    var pword = req.body.passord;
    Accountdata.find({ username: uname, passord: pword }, function(err, docs) {
        if(!err) {
            if (docs.size >= 0){
                res.json(200, { message: docs }); 
            } else {
                res.json(200, { message: "No Login Data" });  
            }
        } else {
          res.json(500, { message: err });
        }
    });
});

module.exports = router;








