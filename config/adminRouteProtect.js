const User = require('../models/admin');

module.exports.protect = async (req, res, next) => {
    if (!req.cookies.userData)
        return res.redirect('/login');
    const curUser = await User.findById(req.cookies.userData);
    if (!curUser)
        return res.redirect('/login');
    next();
}