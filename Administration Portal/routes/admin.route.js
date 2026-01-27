const express = require('express');
const { dashboardPage, loginPage, addNewAdminPage, addAdmin, viewAdminPage, loginLogic } = require('../controller/admin.controller');
const route = express.Router();
const multer = require('multer');

// login page route 
route.get('/', loginPage);
route.post('/login', loginLogic);

// dashboardPage route 
route.get('/dashboard', dashboardPage);

// add admin page route 
route.get('/addNewAdminPage', addNewAdminPage);

// view admin page route 
route.get('/viewAdminPage', viewAdminPage);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const uploads = multer({ storage });

// add new admin logic 
route.post('/addAdmin', uploads.single('profileImage'), addAdmin);

module.exports = route;