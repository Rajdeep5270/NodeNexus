const express = require('express');
const multer = require('multer');
const { addRajasthaniDishPage, rajasthaniFoodViewPage, rajasthaniFoodEditPage, addRajasthaniDish, rajasthaniDishDelete, rajasthaniDishUpdate } = require('../controller/rajasthani.controller');

const route = express.Router();

// rajasthai food add page rendering 
route.get('/', addRajasthaniDishPage);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/rajasthaniItems");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const uploads = multer({ storage });

// rajasthani food add logic and image logic 
route.post('/addRajasthaniDish', uploads.single('dish_image'), addRajasthaniDish);

// rajasthani food view page 
route.get('/rajasthaniFoodViewPage', rajasthaniFoodViewPage);

// rajasthani food edit page 
route.get('/rajasthaniFoodEditPage/:id', rajasthaniFoodEditPage);
route.post('/rajasthaniDishUpdate/:id', uploads.single('dish_image'), rajasthaniDishUpdate)

// rajasthani food delete logic 
route.get('/rajasthaniDishDelete/:id', rajasthaniDishDelete);

module.exports = route;