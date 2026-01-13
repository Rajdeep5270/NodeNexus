const express = require('express');
const { dashboardPage, loginPage, addNewAdminPage } = require('../controller/admin.controller');
const route = express.Router();

// login page route 
route.get('/', loginPage);

// dashboardPage route 
route.get('/dashboard', dashboardPage);

// add admin page route 
route.get('/addNewAdmin', addNewAdminPage);



module.exports = route;