const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Public
router.post('/', contactController.createContact);

module.exports = router;
