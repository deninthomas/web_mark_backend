// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Mentor = require('../models/Mentor');

// Protect route for admin
exports.protectAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const mentor = await Mentor.findById(decoded.id);
    if (!mentor || mentor.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }
    req.mentor = mentor;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Protect route for mentor
exports.protectMentor = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const mentor = await Mentor.findById(decoded.id);
    if (!mentor) {
      return res.status(401).json({ message: 'Mentor not found' });
    }
    req.mentor = mentor;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
