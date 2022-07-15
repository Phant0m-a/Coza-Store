const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
        email: user.email
    },
        process.env.JWT_SECRET || 'somesecretkey', {
        expiresIn: '1d'
    })
}


const isAuth = async (req, res, next) => {

    if (req.cookies) {
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somesecretkey',
            async (err, decode) => {
                if (err) {
                    res.status(200).send({ success: true, message: 'auth successful' });
                } else {
                    next();
                }
            }
        );
    } else {
        res.status(401).send({ success: false, message: 'login failed, incorrect user/password!' });
    }
}

module.exports = {
    isAuth,
    generateToken
};