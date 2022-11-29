const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

//  ROUTES
router.get('/', indexController.index);
router.post('/', indexController.email);
router.post('/sms', indexController.phone);

module.exports = router;

