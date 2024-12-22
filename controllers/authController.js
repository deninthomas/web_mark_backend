// Admin login
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Mentor = require('../models/Mentor');

// Admin login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
};
  
  // Mentor login
  exports.mentorLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const mentor = await Mentor.findOne({ email });
      if (!mentor) return res.status(400).json({ message: 'Mentor not found' });
  
      const isMatch = await bcrypt.compare(password, mentor.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign(
        { mentorId: mentor._id, role: mentor.role },  // Dynamically set role from Mentor model
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error during mentor login' });
    }
  };
  