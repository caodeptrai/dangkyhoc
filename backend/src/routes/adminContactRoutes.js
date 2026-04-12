const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', contactController.getAllContacts);
router.patch('/:id/status', contactController.updateContactStatus);

module.exports = router;
