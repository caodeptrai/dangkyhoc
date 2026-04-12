const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/', forumController.getPublishedPosts);
router.get('/:id', forumController.getPostDetail);
router.post('/:id/react', forumController.reactToPost);

module.exports = router;
