var express = require('express');
var router = express.Router();

var Accountdata = require('../models/accountdata').Accountdata;
/* Login Attempt */
router.post('/', function(req, res) {
    var uname = req.body.username;
    var pword = req.body.password;
    Accountdata.find({ username: uname, password: pword }, function(err, docs) {
	if(!err) {
            if (docs.length > 0){
                res.json(200, { message: docs[0].username });
            } else {
                res.json(200, { message: "No Login Data" });  
            }
        } else {
          res.json(500, { message: err });
        }
    });
});

module.exports = router;








