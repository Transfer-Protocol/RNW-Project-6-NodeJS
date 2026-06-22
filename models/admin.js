const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const validator = require('validator')

const imagePath = '/assets/avatars/';

const required = true;
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        match: [/^[a-z0-9]+$/, 'Username must contain lowercase letters and numbers'],
        default: () => Date.now() + 'username'
    },

    fname: {
        type: String,
        required
    },

    lname: {
        type: String,
        required
    },

    email: {
        type: String,
        required,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required
    },

    avatar: {
        type: String,
    },

    role: {
        type: String,
    },
}, {timestamps: true});

const storage = multer.diskStorage({
    'destination': (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', imagePath));
    },

    'filename': (req, file, cb) => {
        cb(null, "avatar-" + Date.now() + '.' + file.originalname.split('.').at(-1));
    }
});


userSchema.statics.imagePath = imagePath;
userSchema.statics.imageStorage = multer({
    storage
}).single('avatar');

const user = mongoose.model("UserDB", userSchema);
module.exports = user;