const express = require('express');
const { addSouthIndianDishPage, southIndianFoodViewPage, southIndianFoodEditPage } = require('../controller/southIndian.controller');

const route = express.Router();

// south indian food add page 
route.get('/', addSouthIndianDishPage);

// south indian food view page 
route.get('/southIndianFoodViewPage', southIndianFoodViewPage)

// south indian food edit page /
route.get('/southIndianFoodEditPage', southIndianFoodEditPage);

module.exports = route;