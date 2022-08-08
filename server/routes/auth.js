const express = require('express');
const router = express.Router();

const { signupController, signinController } = require('../controllers/auth');

router.post('/signup', signupController);
router.post('/signin', signinController);

module.exports = router;