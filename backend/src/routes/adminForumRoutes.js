const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', forumController.adminGetAllPosts);
router.get('/:id', forumController.adminGetPostDetail);
router.post('/', forumController.createPost);
router.put('/:id', forumController.updatePost);
router.delete('/:id', forumController.deletePost);

module.exports = router;
