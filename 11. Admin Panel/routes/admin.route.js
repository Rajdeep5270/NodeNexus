const express = require('express');
const multer = require('multer');
const { dashboardPage, viewAdminPage, addAdminFormPage, addEmployeeDetails, deleteAdmin, editAdmin, updateAdmin, loginPage, adminLogin, logout } = require('../controller/admin.controller');

const route = express.Router();

// route for login 
route.get('/', loginPage);

// admin login logic 
route.post('/login', adminLogin);

// admin logout logic 
route.get('/logout', logout);

// route for dashboard or home page 
route.get('/dashboardPage', dashboardPage);

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

// edit admin route
route.get('/editAdmin/:id', editAdmin)
route.post('/updateAdmin/:id', uploads.single('profileImage'), updateAdmin)

module.exports = route;