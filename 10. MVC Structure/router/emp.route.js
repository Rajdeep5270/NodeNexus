const express = require('express');

const { empFormPage, addUser } = require("../controller/emp.controller");

const empRoute = express.Router();

empRoute.get('/', empFormPage);
empRoute.post('/addUser', addUser);

module.exports = empRoute;