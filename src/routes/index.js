const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

//  ROUTES
router.get('/', indexController.index);

module.exports = router;

