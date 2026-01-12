const express = require('express');
const { dashboardPage, addFormPage } = require('../controller/blog.controller');

const route = express.Router();

route.get('/', dashboardPage)

route.get('/addpagerendertemp' , addFormPage);

module.exports = route;