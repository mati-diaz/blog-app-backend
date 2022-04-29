const { Router } = require("express");
const validateJWT = require("../middlewares/validateJWT");
const upload = require("../helpers/multerConfig");
const usersController = require('../controllers/users');

const router = Router();

router.get('/', validateJWT, usersController.getUsers);
router.get('/:id', usersController.getUser)
router.put('/', [validateJWT, upload.single('profileImg')], usersController.updateUser);
router.delete('/', validateJWT, usersController.deleteUser);

module.exports = router;