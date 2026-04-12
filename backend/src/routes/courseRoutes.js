const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', courseController.getPublicCourses);
router.get('/:id', courseController.getPublicCourseById);

module.exports = router;
