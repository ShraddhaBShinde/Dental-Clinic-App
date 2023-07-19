const express = require('express');
const { loginController, addDoctorController, getDoctorDetailsController, getUserDetailsController, deleteDoctorController } = require('../controllers/adminCtrl');
const authAdmin = require('../middlewares/authAdmin');
const { authController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
// const authMiddleware = require('../middlewares/authMiddleware');
// const authAdmin = require('../middlewares/authAdmin');

//router object
const router = express.Router();

// // Protect the '/admin' route with the authAdmin middleware
// router.use(authAdmin);


//Auth||post
router.post('/doctor-add', addDoctorController);
router.post('/getAdminData', authMiddleware, authController);

//Auth||get
// router.get('/doctors', getDoctorDetailsController);
router.get('/users', getUserDetailsController);

//Auth||delete
router.delete('/doctors/:id', deleteDoctorController);



module.exports = router;