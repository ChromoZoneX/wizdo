var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var questiondataSchema = new Schema({
    name : { type: String, required: true, trim: true, index: { unique: true } }
  , description : { type: String, required: true }
  , date_created : { type: Date, required: true, default: Date.now}
});
      
var questiondata = mongoose.model('questiondata', questiondataSchema);
      
module.exports = {
  Questiondata: questiondata
};