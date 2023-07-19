const express = require('express');
const { loginController, signupController, bookAppointmentController, getDoctorDetailsController, authController, getAdminDataController } = require('../controllers/userCtrl');
const { getUserDetailsController, addDoctorController, deleteDoctorController } = require('../controllers/adminCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
// const authMiddleware = require('../middlewares/authMiddleware')

//router object
const router = express.Router();

//routes
//login||post
router.post("/login", loginController);

//signup||post
router.post("/signup", signupController);

//Auth||post
router.post("/getUserData", authMiddleware, authController);
router.post('/getAdminData', authMiddleware, getAdminDataController);
router.post('/doctor-add', addDoctorController);

//Auth||get
router.get('/doctors', getDoctorDetailsController);
router.get('/users', getUserDetailsController);

router.post("/book-appointment", authMiddleware, bookAppointmentController);

//delete
//Auth||delete
router.delete('/doctors/:id', deleteDoctorController);

module.exports = router;
