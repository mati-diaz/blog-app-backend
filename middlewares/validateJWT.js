const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token in the request'
        });
    }

    try {
        const user = jwt.verify(token, process.env.SECRET_JWT_KEY);

        req.user = user;
    } catch (error) {
        return res.status(401).json({
            msg: 'Invalid Token'
        })
    }

    next();
}

module.exports = validateJWT