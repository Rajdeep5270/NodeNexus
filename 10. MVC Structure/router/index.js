const express = require('express');
const { homePage, aboutPage, contactPage } = require('../controller/home.controller');

const route = express.Router();
route.use('/empForm', require('./emp.route'));

route.get('/', homePage);
route.get('/about', aboutPage);
route.get('/contact', contactPage);

module.exports = route;