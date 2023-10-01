const jwt = require('jsonwebtoken');
const User = require('../model/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if(!user) throw new Error();
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send('Authentication Error');
    }
}

module.exports = auth;