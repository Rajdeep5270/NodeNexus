const express = require('express');
const multer = require('multer');
const { addSouthIndianDishPage, southIndianFoodViewPage, southIndianFoodEditPage, addSouthIndianDish, southIndianDishDelete, southIndianDishUpdate } = require('../controller/southIndian.controller');

const route = express.Router();

// south indian food add page 
route.get('/', addSouthIndianDishPage);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/southIndianItems");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const uploads = multer({ storage });

// south indian dish add logic 
route.post('/addSouthIndianDish', uploads.single('dish_image'), addSouthIndianDish);

// south indian food view page 
route.get('/southIndianFoodViewPage', southIndianFoodViewPage);

// south indian food edit page /
route.get('/southIndianFoodEditPage/:id', southIndianFoodEditPage);

// south indina food update page 
route.post('/southIndianDishUpdate/:id', uploads.single('dish_image'), southIndianDishUpdate);

// south indian dish delete logic 
route.get('/southIndianDishDelete/:id', southIndianDishDelete);

module.exports = route;