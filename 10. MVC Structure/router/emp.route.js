const express = require('express');

const { empFormPage, addEmp, viewAllEmployee } = require("../controller/emp.controller");

const empRoute = express.Router();

empRoute.get('/', empFormPage);
empRoute.post('/addEmp', addEmp);
empRoute.get('/viewAllEmployee', viewAllEmployee);

module.exports = empRoute;