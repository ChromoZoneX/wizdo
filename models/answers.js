var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var answersSchema = new Schema({
   	username : { type: String, required: true, trim: true, index: { unique: true } },
	q_ids : { type: [String], required: false, trim: true }
});
      
var answers = mongoose.model('answers', answersSchema);
      
module.exports = {
  Answers: answers
};