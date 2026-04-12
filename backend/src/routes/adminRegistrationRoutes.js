const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', registrationController.getAllRegistrations);
router.patch('/:id/status', registrationController.updateRegistrationStatus);

module.exports = router;
