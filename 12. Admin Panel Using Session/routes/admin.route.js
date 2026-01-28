const express = require('express');
const passport = require('passport');
const uploads = require('../middleware/multer.middleware');

const { dashboardPage, viewAdminPage, addAdminFormPage, addEmployeeDetails, deleteAdmin, editAdmin, updateAdmin, loginPage, adminLogin, logout, changePasswordPage, changePassword, profilePage, verifyEmail, verifyOtp, changePasswordThroughOTP, changePasswordThroughOTPPage, notFound } = require('../controller/admin.controller');

const route = express.Router();

// route for login 
route.get('/', passport.checkAuthIsNotDone, loginPage);

// admin login logic 
route.post('/login', passport.checkAuthIsNotDone, passport.authenticate("authentication", {
    failureRedirect: "/",
}), adminLogin);

// change password page rendering 
route.get('/changePasswordPage', passport.checkAuthIsNotDone, changePasswordPage);

// change password logic 
route.post('/changePassword', passport.checkAuthIsNotDone, changePassword);

// verify email 
route.post('/verify-email', passport.checkAuthIsNotDone, verifyEmail);

// otp verify logic and new password change page logic 
route.post('/verifyOTp', passport.checkAuthIsNotDone, verifyOtp);

// new password page through otp 
route.get('/changePasswordThroughOTPPage', passport.checkAuthIsNotDone, changePasswordThroughOTPPage);
route.post('/changePasswordThroughOTP', passport.checkAuthIsNotDone, changePasswordThroughOTP);

// admin logout logic 
route.get('/logout', logout);

route.get('/profile', passport.checkAuthIsDone, profilePage);

// route for dashboard or home page 
route.get('/dashboardPage', passport.checkAuthIsDone, dashboardPage);

// route for all admin view page 
route.get('/viewAdminPage', passport.checkAuthIsDone, viewAdminPage);

// route for add admin form page 
route.get('/addAdminFormPage', passport.checkAuthIsDone, addAdminFormPage);

// route for error 
route.get('/notFound', notFound);

// route for add employee 
route.post('/addEmployee', passport.checkAuthIsDone, uploads.single('profileImage'), addEmployeeDetails);

// delete admin logic 
route.get('/deleteAdmin/:id', deleteAdmin);

// edit admin route
route.get('/editAdmin/:id', passport.checkAuthIsDone, editAdmin)
route.post('/updateAdmin/:id', uploads.single('profileImage'), updateAdmin)

module.exports = route;