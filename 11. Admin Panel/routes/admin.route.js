const express = require('express');
const multer = require('multer');
const { dashboardPage, viewAdminPage, addAdminFormPage, addEmployeeDetails, deleteAdmin } = require('../controller/admin.controller');

const route = express.Router();

// route for dashboard or home page 
route.get('/', dashboardPage);

// route for all admin view page 
route.get('/viewAdminPage', viewAdminPage);

// route for add admin form page 
route.get('/addAdminFormPage', addAdminFormPage);

// route for error 
route.get('/notFound', addAdminFormPage);

// image storation process in uploads/admin folder
const storage = multer.diskStorage({
    destination: ((req, file, cb) => {
        cb(null, "uploads/admin/");
    }),

    filename: ((req, file, cb) => {
        cb(null, Date.now() + " - " + file.originalname);
    })
});

const uploads = multer({ storage });

// route for add employee 
route.post('/addEmployee', uploads.single('profileImage'), addEmployeeDetails);

// delete admin logic 
route.get('/deleteAdmin/:id', deleteAdmin);

module.exports = route;