var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var questionsSchema = new Schema({
    name : { type: String, required: true, trim: true, index: { unique: true } }
  , description : { type: String, required: true }
  , date_created : { type: Date, required: true, default: Date.now}
});
      
var questions = mongoose.model('questions', questionsSchema);
      
module.exports = {
  Questions: questions
};