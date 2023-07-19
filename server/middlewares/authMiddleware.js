const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

// next is middleware fun
exports.authMiddleware = async (req, res, next) => {
    try {
        // If the request is for 'getAdminData' (for admin users), skip this middleware and proceed to the next one
        if (req.path === '/api/v1/user/getAdminData') {
            return next();
        }
        const token = req.headers['authorization'].split(' ')[1]
        // JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
        //     if (err) {
        //         return res.status(200).send({
        //             message: 'Authentication failed',
        //             success: false
        //         })
        //     } else {
        //         // req.body.userId = decode.id;
        //         // Set 'req.userId' based on the decoded token
        //         req.body.userId = decode.id;
        //         req.body.isAdmin = decode.isAdmin;
        //         next();
        //     }
        // })
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        // Set 'req.userId' based on the decoded token
        req.body.userId = decoded.id;
        req.body.isAdmin = decoded.isAdmin; // Add this line to set isAdmin flag

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: 'Authentication failed',
            success: false
        });
    }
}


//admin acceess
exports.isAdmin = async (req, res, next) => {
    try {

        if (req.body.isAdmin === true) {
            // If the user is an admin, directly send the admin response
            return res.status(200).send({
                message: 'Admin data fetched successfully!',
                success: true,
                data: {
                    name: req.user.name,
                    email: req.user.email,
                    isAdmin: req.user.isAdmin,
                },
            });
        }

        // // If the user is not an admin, continue to the next middleware (getUserDataController)
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};