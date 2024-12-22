const express = require('express');
const mentorController = require('../controllers/mentorController');
const router = express.Router();

router.post('/login', mentorController.login);
router.get('/projects', mentorController.getProjects);
router.put('/projects/submission', mentorController.editSubmission);

module.exports = router;
