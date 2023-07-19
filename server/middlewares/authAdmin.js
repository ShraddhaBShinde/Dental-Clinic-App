const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.log('Error decoding token:', err);
                return res.status(401).send({
                    success: false,
                    message: 'Invalid token',
                });
            }

            console.log('Decoded token:', decoded);

            // Check if the decoded ID is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized Access',
                });
            }

            const user = await userModel.findById(decoded.id);

            if (!user) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized Access',
                });
            }

            // const isAdmin = user.isAdmin;
            // Get isAdmin value from request headers (set by the client-side)
            const isAdmin = req.headers['isAdmin'] === 'true';

            if (!isAdmin) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized Access',
                });
            }

            req.body.userId = decoded.id; // Optionally, you can set userId in the request body if needed.

            next();
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: 'Error in admin middleware',
        });
    }
};
