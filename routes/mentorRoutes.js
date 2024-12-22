// routes/mentorRoutes.js
const express = require('express');
const router = express.Router();
const { viewAssignedProjects, updateSubmissionStatus } = require('../controllers/mentorController');
const { protectMentor } = require('../middleware/authMiddleware'); // Mentor authentication middleware

// Mentor routes
router.get('/assigned-projects', protectMentor, viewAssignedProjects); // Mentor only
router.put('/update-submission', protectMentor, updateSubmissionStatus); // Mentor only

module.exports = router;
