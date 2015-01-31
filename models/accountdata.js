var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var accountdataSchema = new Schema({
    username : { type: String, required: true, trim: true, index: { unique: true } },
    password : { type: String, required: true }, 
    date_created : { type: Date, required: true, default: Date.now}
});
      
var accountdata = mongoose.model('accountdata', accountdataSchema);
      
module.exports = {
  Accountdata: accountdata
};