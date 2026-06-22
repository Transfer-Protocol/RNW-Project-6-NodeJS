const express = require('express');
const path = require('path');

require('./config/db');

const app = express();
const port = 32763;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', require('./routes/adminRoutes'));

app.use('/users', require('./routes/users'))

app.listen(port, err => {
    if (err) return console.log(err);
    console.log(`Server is listening on http://localhost:${port}`);
});