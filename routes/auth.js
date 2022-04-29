const { Router } = require("express");
const { check } = require('express-validator');
const validateFields = require("../middlewares/validateFields");
const upload = require("../helpers/multerConfig");
const authController = require('../controllers/auth');
const validateJWT = require("../middlewares/validateJWT");

const router = Router();

router.post('/register', [
    upload.single('profileImg'),
    check('email', 'Se necesita un correo').notEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('fullname', 'Se necesita un nombre').notEmpty(),
    check('password', 'Se necesita una contraseña').notEmpty(),
    validateFields
], authController.register);

router.post('/login', [
    check('email', 'Se necesita un correo').notEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'Se necesita una contraseña').notEmpty(),
    validateFields
], authController.login);

router.get('/autologin', validateJWT, authController.autoLogin);

module.exports = router;