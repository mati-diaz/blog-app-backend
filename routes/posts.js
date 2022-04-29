const { Router } = require("express");
const validateJWT = require("../middlewares/validateJWT");
const upload = require("../helpers/multerConfig");
const postsController = require('../controllers/posts');

const router = Router();

router.post('/blog/:id', [validateJWT, upload.single('postImg')], postsController.createPost);
router.get('/blog/:id', postsController.getPostsByBlog);
router.get('/', validateJWT, postsController.getPosts);
router.get('/:id', postsController.getPost);
router.put('/:id', [validateJWT, upload.single('postImg')], postsController.updatePost);
router.delete('/:id', validateJWT, postsController.deletePost);

module.exports = router;