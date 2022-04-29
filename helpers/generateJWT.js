const jwt = require("jsonwebtoken");

const createJWT = (fullName, id) => {
    return new Promise((resolve, reject) => {
        const payload = { fullName, id };

        jwt.sign(payload, process.env.SECRET_JWT_KEY, {
            expiresIn: "1h",
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('The token was not generated');
            }

            resolve(token);
        });
    });
}

module.exports = createJWT;