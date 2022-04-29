const { Router } = require("express");
const validateJWT = require("../middlewares/validateJWT");
const searchController = require('../controllers/search');

const router = Router();

router.get('/', validateJWT, searchController.searchPosts);

module.exports = router;