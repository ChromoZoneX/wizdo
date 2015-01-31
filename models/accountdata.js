var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var accountdataSchema = new Schema({
    	_id : { type: String, required: true, trim: true, index: { unique: true } },
	    name : { type: String, required: true, trim: true },
	    email : { type: String, required: true, trim: true },
	    password: { type: String, required: true, trim: true },
	    age: { type: Number, required: true, trim: true },
	    gender: { type: String, required: true, trim: true },
	    timestamp : { type: Date, required: true, default: Date.now }
});
      
var accountdata = mongoose.model('accountdata', accountdataSchema);
      
module.exports = {
  Accountdata: accountdata
};