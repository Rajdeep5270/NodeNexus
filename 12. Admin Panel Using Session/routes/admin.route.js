const express = require('express');
const uploads = require('../middleware/multer.middleware');

const { dashboardPage, viewAdminPage, addAdminFormPage, addEmployeeDetails, deleteAdmin, editAdmin, updateAdmin, loginPage, adminLogin, logout, changePasswordPage, changePassword, profilePage, verifyEmail, verifyOtp, changePasswordThroughOTP, changePasswordThroughOTPPage } = require('../controller/admin.controller');

const route = express.Router();

// route for login 
route.get('/', loginPage);

// admin login logic 
route.post('/login', adminLogin);

// change password page rendering 
route.get('/changePasswordPage', changePasswordPage);

// change password logic 
route.post('/changePassword', changePassword);

// verify email 
route.post('/verify-email', verifyEmail);

// otp verify logic and new password change page logic 
route.post('/verifyOTp', verifyOtp);

// new password page through otp 
route.get('/changePasswordThroughOTPPage', changePasswordThroughOTPPage);
route.post('/changePasswordThroughOTP', changePasswordThroughOTP);

// admin logout logic 
route.get('/logout', logout);

route.get('/profile', profilePage);

// route for dashboard or home page 
route.get('/dashboardPage', dashboardPage);

// route for all admin view page 
route.get('/viewAdminPage', viewAdminPage);

// route for add admin form page 
route.get('/addAdminFormPage', addAdminFormPage);

// route for error 
route.get('/notFound', addAdminFormPage);

// route for add employee 
route.post('/addEmployee', uploads.single('profileImage'), addEmployeeDetails);

// delete admin logic 
route.get('/deleteAdmin/:id', deleteAdmin);

// edit admin route
route.get('/editAdmin/:id', editAdmin)
route.post('/updateAdmin/:id', uploads.single('profileImage'), updateAdmin)

module.exports = route;