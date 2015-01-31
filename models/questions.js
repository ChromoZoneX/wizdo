var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var questionsSchema = new Schema({
    username : { type: String, required: true, trim: true, index: { unique: true } },
	q_ids : { type: [String], required: false, trim: true }
});
      
var questions = mongoose.model('questions', questionsSchema);
      
module.exports = {
  Questions: questions
};