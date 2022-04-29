const { Router } = require("express");
const validateJWT = require("../middlewares/validateJWT");
const blogsController = require('../controllers/blogs');

const router = Router();

router.post('/', validateJWT, blogsController.createBlog);
router.get('/', validateJWT, blogsController.getBlogs);
router.get('/own', validateJWT, blogsController.getOwnBlogs);
router.get('/:id', blogsController.getBlog);
router.get('/user/:id', blogsController.getBlogsByUser);
router.put('/:id', validateJWT, blogsController.updateBlog);
router.delete('/:id', validateJWT, blogsController.deleteBlog);

module.exports = router;