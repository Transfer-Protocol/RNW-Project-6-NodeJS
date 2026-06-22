const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/adminpanel').then(v => console.log('Mongoose Connected'));