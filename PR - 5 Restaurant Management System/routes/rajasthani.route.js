const express = require('express');
const { addRajasthaniDishPage, rajasthaniFoodViewPage, rajasthaniFoodEditPage } = require('../controller/rajasthani.controller');

const route = express.Router();

// rajasthai food add page 
route.get('/', addRajasthaniDishPage);

// rajasthani food view page 
route.get('/rajasthaniFoodViewPage', rajasthaniFoodViewPage);

// rajasthani food edit page 
route.get('/rajasthaniFoodEditPage',rajasthaniFoodEditPage);

module.exports = route;