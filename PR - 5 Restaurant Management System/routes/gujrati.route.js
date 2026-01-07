const express = require('express');
const multer = require('multer');
const { addGujaratiDishPage, gujratiFoodViewPage, gujratiFoodEditPage, addGujratiDish, gujratiDishDelete, gujratiDishUpdate, addToOrder } = require('../controller/gujrati.controller');

const route = express.Router();

// gujarati food add page render
route.get('/', addGujaratiDishPage);

// file destination and filename logic 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/gujratiItems");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const uploads = multer({ storage });

// gujrati food dish add logic 
route.post('/addGujratiDish', uploads.single('dish_image'), addGujratiDish);

// gujaragi food view page 
route.get('/gujratiFoodViewPage', gujratiFoodViewPage)

// gujarati food edit page 
route.get('/gujratiFoodEditPage/:id', gujratiFoodEditPage);
route.post('/gujratiDishUpdate/:id', uploads.single('dish_image'), gujratiDishUpdate)

// gujrati dish delete logic 
route.get('/gujratiDishDelete/:id', gujratiDishDelete);

module.exports = route;