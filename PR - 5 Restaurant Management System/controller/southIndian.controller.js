const southIndian = require('../model/southIndian.model');
const fs = require('fs');

module.exports.addSouthIndianDishPage = (req, res) => {
    return res.render('southIndian/southIndianFoodAddPage');
}

// add southindian dish logic 
module.exports.addSouthIndianDish = async (req, res) => {
    try {
        req.body.dish_image = req.file.path;

        const dishAdded = await southIndian.create(req.body);

        if (!dishAdded) {
            console.log("Dish not added...");
            return res.redirect('/addSouthIndianDishPage/');
        }

        console.log("Dish added successfully...");
        return res.redirect('/addSouthIndianDishPage/southIndianFoodViewPage');
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error : ", e);
    }
}

// south indian food view page 
module.exports.southIndianFoodViewPage = async (req, res) => {
    try {
        const dishFound = await southIndian.find();

        if (!dishFound) {
            console.log("Dish not found at view page");
            return res.redirect('/addSouthIndianDishPage/')
        }

        console.log("Dish found");
        res.render("southIndian/southIndianFoodViewPage", { dishFound });
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error : ", e);
    }
}

// south indian food edit fill logic 
module.exports.southIndianFoodEditPage = async (req, res) => {
    try {
        const editDish = await southIndian.findById(req.params.id);

        if (!editDish) {
            console.log("Data not found to edit...")
            res.redirect('/addSouthIndianDishPage/southIndianFoodViewPage');
        }

        console.log("Data found to edit");
        return res.render('southIndian/southIndianFoodEditPage', { editDish });
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error : ", e);
    }
}

// south indian dish food update logic 
module.exports.southIndianDishUpdate = async (req, res) => {
    try {
        if (req.file) {
            req.body.dish_image = req.file.path;

            const editedDish = await southIndian.findByIdAndUpdate(req.params.id, req.body);

            fs.unlink(editedDish.dish_image, () => { });

            if (!editedDish) {
                console.log("Dish not updated...");
                return res.redirect('/addsouthIndianDishPage/southIndianFoodEditPage');
            }

            console.log("Dish updated successfully...");
            return res.redirect('/addsouthIndianDishPage/southIndianFoodViewPage');
        } else {
            const editedDish = await southIndian.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!editedDish) {
                console.log("Dish not updated...");
                return res.redirect('/addsouthIndianDishPage/southIndianFoodEditPage');
            }

            console.log("Dish updated successfully...");
            return res.redirect('/addsouthIndianDishPage/southIndianFoodViewPage');
        }
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error", e);
    }
}

// south indian dish delete logic 
module.exports.southIndianDishDelete = async (req, res) => {
    try {
        const deletedDish = await southIndian.findByIdAndDelete(req.params.id);

        fs.unlink(deletedDish.dish_image, () => { });

        if (!deletedDish) {
            console.log("Dish not deleted...");
            res.redirect('/addSouthIndianDishPage/southIndianFoodViewPage')
        }

        console.log("Dish deleted successfully...");
        res.redirect('/addSouthIndianDishPage/southIndianFoodViewPage');
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error : ", e);
    }
}