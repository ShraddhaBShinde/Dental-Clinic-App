const express = require('express');
const { addDoctorController, getDoctorDetailsController } = require('../controllers/adminCtrl');
// const authMiddleware = require('../middlewares/authMiddleware');
// const authAdmin = require('../middlewares/authAdmin');

//router object
const router = express.Router();


//Auth||post
router.post('/doctor-add', addDoctorController);
router.get('/doctors', getDoctorDetailsController);

module.exports = router;