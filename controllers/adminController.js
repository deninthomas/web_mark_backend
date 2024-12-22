const Admin = require('../models/Admin');
const Mentor = require('../models/Mentor');
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

exports.addMentor = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const mentor = new Mentor({ name, email, phone, password: hashedPassword });
  await mentor.save();
  res.status(201).json(mentor);
};

exports.addProject = async (req, res) => {
  const { title, description } = req.body;
  const project = new Project({ title, description });
  await project.save();
  res.status(201).json(project);
};

exports.assignProject = async (req, res) => {
  const { projectId, mentorId } = req.body;
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  const mentor = await Mentor.findById(mentorId);
  if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

  project.mentor = mentor._id;
  await project.save();

  mentor.projects.push(project._id);
  await mentor.save();

  res.json({ message: 'Project assigned successfully' });
};

exports.deleteMentor = async (req, res) => {
  const { mentorId } = req.params;
  await Mentor.findByIdAndDelete(mentorId);
  res.json({ message: 'Mentor deleted successfully' });
};

exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;
  await Project.findByIdAndDelete(projectId);
  res.json({ message: 'Project deleted successfully' });
};