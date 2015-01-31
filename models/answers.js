var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var answersSchema = new Schema({
    name : { type: String, required: true, trim: true, index: { unique: true } }
  , description : { type: String, required: true }
  , date_created : { type: Date, required: true, default: Date.now}
});
      
var answers = mongoose.model('answers', answersSchema);
      
module.exports = {
  Answers: answers
};