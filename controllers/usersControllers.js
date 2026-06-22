const User = require('../models/admin');
const bcrype = require('bcrypt');
const fs = require('fs');
const path = require('path');
const lib = require('../lib');

module.exports.add = async (req, res) => {
    res.render('addUser', {header: lib.compileHeaderProperties({curUser: await User.findById(req.cookies.userData)})});
}

module.exports.view = async (req, res) => {
    res.render('viewUser', {users: await User.find(), header: lib.compileHeaderProperties({curUser: await User.findById(req.cookies.userData)})});
}

module.exports.viewpost = async (req, res) => {
    try {
        const currentUser = await User.findOne({
            email: req.body.email
        });
    
        if (currentUser) {
            return res.render('info', {info: 'Email id already exists'});
        }
    
        req.body.password = bcrype.hashSync(req.body.password, 10);
        await User.create(req.body);
        module.exports.view(req, res);
    } catch (err) {
        res.end(err.toString());
    }
}

module.exports.login = async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.body.email });
        if (!userData)
            return res.render('info', {info: "Could not find email"});
        if (!bcrype.compareSync(req.body.password, userData.password))
            return res.render('info', {info: 'Invalid password'});
        console.log('Hello World 1')
        res.cookie("userData", userData._id, {'maxAge': 1000 * 60 * 60 * 24});
        console.log('Hello World 2')
        res.redirect('/');
    } catch (err) {

    }
};

module.exports.edit = async (req, res) => {
    try {
        const id = req.cookies.userData;
        const curUser = await User.findById(id);
        if (!curUser)
            return res.render('info', {info: 'You are using an invalid id'});
        User.imageStorage(req, res, async () => {
            if (!req.file)
                req.body.avatar = curUser.avatar;
            else {
                if (curUser.avatar)
                fs.unlinkSync(path.join(__dirname, '..', 'public', curUser.avatar))
                req.body.avatar = User.imagePath + req.file?.filename;
            };
            await User.findByIdAndUpdate(id, req.body);
            res.redirect('/users/view');
        });
    } catch (err) {

    }
}

module.exports.logout = async (_, res) => {
    try {
        res.clearCookie('userData');
        res.redirect('/login');
    } catch (err) {

    }
}