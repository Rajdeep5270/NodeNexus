const express = require('express');
const { viewItemsPage } = require('../controller/item.controller');

const route = express.Router();

route.get('/', viewItemsPage);

// gujarati food route 
route.use('/addGujratiDishPage', require('./gujrati.route'));

// rajasthani food route 
route.use('/addRajasthaniDishPage', require('./rajasthani.route'));

// south indian food route 
route.use('/addSouthIndianDishPage', require('./southIndian.route'));

module.exports = route;