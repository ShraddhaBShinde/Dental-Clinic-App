// adminCtrl.js
const Doctor = require('../models/doctorModel');

const addDoctorController = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            email,
            address,
            specialization,
            experience,
            feesPerCunsaltation,
            timings,
        } = req.body;

        // Create a new doctor instance
        const newDoctor = new Doctor({
            firstName,
            lastName,
            phone,
            email,
            address,
            specialization,
            experience,
            feesPerCunsaltation,
            timings,
            isDoctor: true, // Set isDoctor to true for the admin-created doctor
        });

        // Save the new doctor to the database
        const savedDoctor = await newDoctor.save();

        res.status(201).send({
            message: 'Doctor Added!',
            success: true,
            data: savedDoctor,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error: 'Server Error',
        });
    }
};

const getDoctorDetailsController = async (req, res) => {
    try {
        // Fetch all doctor documents from the database
        const doctors = await Doctor.find();

        res.status(200).send({
            success: true,
            data: doctors,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error: 'Server Error',
        });
    }
};

module.exports = {
    addDoctorController, getDoctorDetailsController
};
