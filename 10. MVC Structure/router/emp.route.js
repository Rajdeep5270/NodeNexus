const express = require('express');

const { empFormPage, addEmp, viewAllEmployee, deleteEmp, editEmp, updateEmp } = require("../controller/emp.controller");

const empRoute = express.Router();

empRoute.get('/', empFormPage);
empRoute.post('/addEmp', addEmp);
empRoute.get('/viewAllEmployee', viewAllEmployee);
empRoute.get('/editEmp/:id', editEmp);
// error coming in this /empForm/updateEmp request not found
empRoute.post('/updateEmp/:id', updateEmp)
empRoute.get('/deleteEmp/:id', deleteEmp);

module.exports = empRoute;