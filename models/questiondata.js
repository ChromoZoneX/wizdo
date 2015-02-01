var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var questiondataSchema = new Schema({
    q_id : { type: String, required: true, trim: true, index: { unique: true } },
    username : { type: String, required: true, trim: true },
    question : { type: String, required: true, trim: true },
    yes : { type: Number, required: true, trim: true },
    no: { type: Number, required: true, trim: true },
    timestamp : { type: Date, required: true, default: Date.now }
});
      
var questiondata = mongoose.model('questiondata', questiondataSchema);
      
module.exports = {
  QuestionData: questiondata
};
