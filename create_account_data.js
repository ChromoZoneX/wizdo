var http = require('http');
var mongoose = require('mongoose');

var db = mongoose.createConnection('localhost', 'test');

var accountData_Schema = mongoose.Schema({
	    username : { type: String, required: true, trim: true, index: { unique: true } },
	    name : { type: String, required: true, trim: true },
	    email : { type: String, required: true, trim: true },
	    password: { type: String, required: true, trim: true },
	    age: { type: Number, required: true, trim: true },
	    gender: { type: String, required: true, trim: true },
	    timestamp : { type: Date, required: true, default: Date.now },
});
var accountData = db.model('account_data', accountData_Schema);

var testAccountData = new accountData({
	username:"username" ,
	name: "random,",
	email: "random@random.com",
	password: "123456",
	age: 21,
	gender: "Female",
	timestamp: new Date().toString()
});

testAccountData.save(function (err) {
  if (err) 
  	console.error (err);// ...
  else
  	console.log('Account data model created');
});