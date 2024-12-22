const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', default: null },
  submissions: [{
    studentName: { type: String, required: true },
    status: { type: String, enum: ['Completed', 'Pending'], default: 'Pending' },
    marks: Number,
    comments: String
  }]
});
module.exports = mongoose.model('Project', projectSchema);