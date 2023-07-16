// authAdmin.js
const JWT = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    error: 'Unauthorized',
                });
            }

            // Check if the user is authenticated and has admin privileges
            // You can modify this condition based on your authentication logic
            if (decoded.isAdmin) {
                // User is authenticated and has admin privileges
                // Call the next middleware or proceed to the route handler
                next();
            } else {
                // User is not authenticated or does not have admin privileges
                res.status(401).send({
                    success: false,
                    error: 'Unauthorized',
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error: 'Server Error',
        });
    }
};

module.exports = authAdmin;
