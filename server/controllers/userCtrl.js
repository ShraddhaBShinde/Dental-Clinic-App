const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');  //encrypting the password
const jwt = require('jsonwebtoken')

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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
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

module.exports = { loginController, signupController, authController };