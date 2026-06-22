const User = require('../models/admin');
const lib = require('../lib');

// Extra

module.exports.testtube = (_, res) => {
    res.render('testtube');
}

module.exports.dashboard = async (req, res) => {
    try {
        res.render('dashboard', {pageTitle: 'AdminLTE v4 | Dashboard', header: lib.compileHeaderProperties({curUser: await User.findById(req.cookies.userData)})});
    } catch (err) {
        res.end('Error loading page');
    }
}

module.exports.adduser = (req, res) => {
    try {
        User.imageStorage(req, res, async () => {
            try {
                req.body.avatar = User.imagePath + req.file?.filename;
                await User.create(req.body);
                res.redirect('/');
            } catch (err) {
                res.end('Error loading page');
            }
        });
    } catch (err) {
        res.end('Error loading page');
    }
}

module.exports.edit = async (req, res) => {
    res.render('editUser', {
        profile: await User.findById(
            req.cookies.userData
        ),
        header: lib.compileHeaderProperties({curUser: await User.findById(req.cookies.userData)})
    });
}

module.exports.login = (_, res) => {
    res.render('login');
}

module.exports.register = (_, res) => {
    res.render('register');
}