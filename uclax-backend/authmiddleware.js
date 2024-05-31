const jwt = require('jsonwebtoken');
const { userDetails } = require('./account.js') ;

const authTokenVerify = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({ errorMessage: "missing token." });
    }
    try {
        await userDetails(token);
        next();
    } catch (error) {
        console.log(error);
    }
}

exports.authTokenVerify = authTokenVerify;
