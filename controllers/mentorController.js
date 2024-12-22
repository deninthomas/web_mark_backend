const Mentor = require('../models/Mentor');
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const mentor = await Mentor.findOne({ email });
  if (!mentor) return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, mentor.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: mentor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

exports.getProjects = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const mentor = await Mentor.findById(decoded.id).populate('projects');
  if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

  res.json(mentor.projects);
};

exports.editSubmission = async (req, res) => {
  const { projectId, submissionId, status, marks, comments } = req.body;

  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  const submission = project.submissions.id(submissionId);
  if (!submission) return res.status(404).json({ message: 'Submission not found' });

  if (status) submission.status = status;
  if (marks) submission.marks = marks;
  if (comments) submission.comments = comments;

  await project.save();
  res.json({ message: 'Submission updated successfully' });
};
