const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');  //encrypting the password
const jwt = require('jsonwebtoken')
const appointmentModel = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');

//signup callback
const signupController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).send({ message: "User already exists", success: false });
        }

        const password = await req.body.password;
        const salt = await bcrypt.genSalt(10); //hashes the password 10 times
        const hashedPassword = await bcrypt.hash(password, salt); //we'll get encrypted pw 
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: "SignUp Successful!", success: true });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Signup Controller ${error.message}` });
    }
};

//login callback
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid email or password', success: false });
        }

        // After successfully authenticating the user
        const tokenPayload = {
            id: user._id,
            isAdmin: user.isAdmin,
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' });
        // Add isAdmin field to the response object

        res.status(200).send({
            message: 'Login Successful!',
            success: true,
            token,
            data: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: `Error in Login Controller ${error.message}` });
    }
}

//getAdminData
const getAdminDataController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false });
        }

        // Check if the user is an admin
        const isAdmin = user.isAdmin;

        res.status(200).send({
            message: 'Admin data fetched successfully!',
            success: true,
            data: {
                name: user.name,
                email: user.email,
                isAdmin: isAdmin,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in getAdminDataController: ${error.message}` });
    }
};


const bookAppointmentController = async (req, res) => {
    try {
        const { userId, doctorId, doctorInfo, userInfo, date, time } = req.body;

        // Create a new appointment
        const newAppointment = new appointmentModel({
            userId,
            doctorId,
            doctorInfo,
            userInfo,
            date,
            time,
        });

        // Save the appointment to the database
        await newAppointment.save();

        res.status(200).json({
            success: true,
            message: "Appointment booked successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong!",
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


const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: "user not found",
                success: false,
            });
        } else {
            res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "auth error",
            success: false,
            error,
        });
    }
};

module.exports = { loginController, signupController, bookAppointmentController, getDoctorDetailsController, getAdminDataController, authController };