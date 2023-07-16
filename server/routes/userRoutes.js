const express = require('express');
const { loginController, signupController, authController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware')

//router object
const router = express.Router();

//routes
//login||post
router.post("/login", loginController);

//signup||post
router.post("/signup", signupController);

//Auth||post
router.post("/getUserData", authMiddleware, authController);

module.exports = router;