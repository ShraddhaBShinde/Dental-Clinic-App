// adminCtrl.js
// const mongoose = require('mongoose');
const Doctor = require('../models/doctorModel');
const userModel = require('../models/userModel')

// Login controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });

        // Check if user exists and password is correct
        if (!user || !user.comparePassword(password)) {
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Generate token with isAdmin property
        const token = JWT.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

        res.status(200).send({
            success: true,
            token,
            data: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in login',
        });
    }
};

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

const getUserDetailsController = async (req, res) => {
    try {
        // Fetch all doctor documents from the database
        const users = await userModel.find({ isAdmin: false });

        res.status(200).send({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error: 'Server Error',
        });
    }
};

const deleteDoctorController = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID format
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).send({
        //         success: false,
        //         error: 'Invalid ID format',
        //     });
        // }

        // Find the doctor by ID and delete it from the database
        const deletedDoctor = await Doctor.findByIdAndDelete(id);

        if (!deletedDoctor) {
            return res.status(404).send({
                success: false,
                error: 'Doctor not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Doctor deleted successfully',
            data: deletedDoctor,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error: 'Server Error',
        });
    }
};

const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        if (!user) {
            return res.status(200).send({
                message: "User not found",
                success: false,
            });
        }

        res.status(200).send({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Auth Error",
            success: false,
            error,
        });
    }
};


module.exports = {
    loginController, addDoctorController, getDoctorDetailsController, getUserDetailsController, deleteDoctorController, authController
};