var express = require('express');
var router  = express.Router();
var searchController = require('../controllers/searchController');

router.get('/', searchController.query);

module.exports = router;