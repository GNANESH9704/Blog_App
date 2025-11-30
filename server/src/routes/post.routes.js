
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', postController.listPosts);
router.get('/:id', postController.getPost);
router.post('/', authenticate, postController.createPost);
router.put('/:id', authenticate, postController.updatePost);
router.delete('/:id', authenticate, postController.deletePost);

module.exports = router;
