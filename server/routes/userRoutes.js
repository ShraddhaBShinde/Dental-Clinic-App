const express = require('express');
const { loginController, signupController } = require('../controllers/userCtrl');

//router object
const router = express.Router();

//routes
//login||post
router.post("/login", loginController);

//signup||post
router.post("/signup", signupController);

module.exports = router;