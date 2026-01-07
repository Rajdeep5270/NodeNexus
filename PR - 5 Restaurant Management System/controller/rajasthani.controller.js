const rajasthani = require('../model/rajasthani.model');
const fs = require('fs');

module.exports.addRajasthaniDishPage = (req, res) => {
    return res.render('rajasthani/rajasthaniFoodAddPage');
}

// add rajasthani dish logic and image logic 
module.exports.addRajasthaniDish = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    try {
        req.body.dish_image = req.file.path;

        const dishAdded = await rajasthani.create(req.body);

        if (!dishAdded) {
            console.log("Dish not added...");
            return res.redirect('/addRajasthaniDishPage/');
        }

        console.log("Dish added successfully...");
        return res.redirect('/addRajasthaniDishPage/rajasthaniFoodViewPage');
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error : ", e);
    }
}

// rajasthani food view page 
module.exports.rajasthaniFoodViewPage = async (req, res) => {
    try {
        const dishFound = await rajasthani.find();

        if (!dishFound) {
            console.log("Dish not found at view page");
            return res.redirect('/addRajasthaniDishPage/')
        }

        console.log("Dish found");
        res.render("rajasthani/rajasthaniFoodViewPage", { dishFound });
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error : ", e);
    }
}

// rajasthani food data fill in edit page logic 
module.exports.rajasthaniFoodEditPage = async (req, res) => {
    try {
        const editDish = await rajasthani.findById(req.params.id);

        if (!editDish) {
            console.log("Data not found to edit...")
            res.redirect('/addRajasthaniDishPage/rajasthaniFoodViewPage');
        }

        console.log("Data found to edit");
        return res.render('rajasthani/rajasthaniFoodEditPage', { editDish });
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error : ", e);
    }
}

// rajasthani data update logic with image  
module.exports.rajasthaniDishUpdate = async (req, res) => {
    try {
        if (req.file) {
            req.body.dish_image = req.file.path;

            const editedDish = await rajasthani.findByIdAndUpdate(req.params.id, req.body);

            fs.unlink(editedDish.dish_image, () => { });

            if (!editedDish) {
                console.log("Dish not updated...");
                return res.redirect('/addRajasthaniDishPage/rajasthaniFoodEditPage');
            }

            console.log("Dish updated successfully...");
            return res.redirect('/addRajasthaniDishPage/rajasthaniFoodViewPage');
        } else {
            const editedDish = await rajasthani.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!editedDish) {
                console.log("Dish not updated...");
                return res.redirect('/addRajasthaniDishPage/rajasthaniFoodEditPage');
            }

            console.log("Dish updated successfully...");
            return res.redirect('/addRajasthaniDishPage/rajasthaniFoodViewPage');
        }
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error", e);
    }
}

// delete food logic 
module.exports.rajasthaniDishDelete = async (req, res) => {
    try {
        const deletedDish = await rajasthani.findByIdAndDelete(req.params.id);

        fs.unlink(deletedDish.dish_image, () => { });

        if (!deletedDish) {
            console.log("Dish not deleted...");
            res.redirect('/addRajasthaniDishPage/rajasthaniFoodViewPage')
        }

        console.log("Dish deleted successfully...");
        res.redirect('/addRajasthaniDishPage/rajasthaniFoodViewPage');
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error : ", e);
    }
}