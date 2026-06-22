const express = require('express');
const adminCtl = require('../controllers/adminControllers');
const routeProtect = require('../config/adminRouteProtect');

const routes = express.Router();

routes.get('/', routeProtect.protect, adminCtl.dashboard);
routes.get('/register', adminCtl.register);
routes.get('/testtube', adminCtl.testtube);
routes.get('/login', adminCtl.login);
routes.get('/edit', routeProtect.protect, adminCtl.edit);

routes.post('/add-user', adminCtl.adduser)

module.exports = routes;