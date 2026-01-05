const express = require('express');
const { addGujaratiDishPage, gujratiFoodViewPage, gujratiFoodEditPage } = require('../controller/gujrati.controller');

const route = express.Router();

// gujarati food add page 
route.get('/', addGujaratiDishPage);

// gujaragi food view page 
route.get('/gujratiFoodViewPage', gujratiFoodViewPage)

// gujarati food edit page 
route.get('/gujratiFoodEditPage', gujratiFoodEditPage);

module.exports = route;