const express = require('express');
const usersCtl = require('../controllers/usersControllers');
const routeProtect = require('../config/adminRouteProtect');

const routes = express.Router();

routes.get('/add', routeProtect.protect, usersCtl.add);
routes.get('/view', routeProtect.protect, usersCtl.view);
routes.get('/logout', usersCtl.logout);
routes.post('/view', usersCtl.viewpost);
routes.post('/login', usersCtl.login);
routes.post('/edit', usersCtl.edit);

module.exports = routes;