const { Router } = require("express");
const validateJWT = require("../middlewares/validateJWT");
const commentsController = require('../controllers/comments');

const router = Router();

router.post('/', validateJWT, commentsController.createComment);
router.get('/:post_id', commentsController.getComments);
router.put('/:id', validateJWT, commentsController.updateComment);
router.delete('/:id', validateJWT, commentsController.deleteComment);

module.exports = router;