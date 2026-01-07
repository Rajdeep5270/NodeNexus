const gujrati = require('../model/gujrati.model');
const order = require('../model/order.model');
const fs = require('fs');

// add page render 
module.exports.addGujaratiDishPage = (req, res) => {
    return res.render('gujrati/gujratiFoodAddPage');
}

// add dish logic 
module.exports.addGujratiDish = async (req, res) => {
    try {
        // console.log(req.file);

        req.body.dish_image = req.file.path;

        const dishAdded = await gujrati.create(req.body);

        console.log(dishAdded);

        if (!dishAdded) {
            console.log("Something went wrong")
            return res.redirect('/addGujratiDishPage/');
        }

        console.log("Dish insertion successfull...")
        return res.redirect('/addGujratiDishPage/gujratiFoodViewPage');
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error", e);
    }
}

// view gujrati food logic 
module.exports.gujratiFoodViewPage = async (req, res) => {
    try {
        const itemsFound = await gujrati.find()

        if (!itemsFound) {
            console.log("Items not found...");
            return res.redirect('/addGujratiDish/');
        }

        console.log("Items found...");
        return res.render('gujrati/gujratiFoodViewPage', { itemsFound });
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error", e);
    }
}

// edit page rendering and edit food shown logic 
module.exports.gujratiFoodEditPage = async (req, res) => {
    try {
        const editDish = await gujrati.findById(req.params.id);

        if (!editDish) {
            console.log("Edit dish not found...");
            return res.redirect('/addGujratiDishPage/gujratiFoodViewPage');
        }

        console.log("Edit dish found...");
        return res.render('gujrati/gujratiFoodEditPage', { editDish });
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error", e);
    }
}

// gujrati dish update logic 
module.exports.gujratiDishUpdate = async (req, res) => {
    // for debugging 
    // console.log(req.body);
    // console.log(req.params);
    // console.log(req.file);
    try {
        if (req.file) {
            req.body.dish_image = req.file.path;

            const editedDish = await gujrati.findByIdAndUpdate(req.params.id, req.body);

            fs.unlink(editedDish.dish_image, () => { });

            if (!editedDish) {
                console.log("Dish not updated...");
                return res.redirect('/addGujratiDishPage/gujratiFoodEditPage');
            }

            console.log("Dish updated successfully...");
            return res.redirect('/addGujratiDishPage/gujratiFoodViewPage');
        } else {
            const editedDish = await gujrati.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!editedDish) {
                console.log("Dish not updated...");
                return res.redirect('/addGujratiDishPage/gujratiFoodEditPage');
            }

            console.log("Dish updated successfully...");
            return res.redirect('/addGujratiDishPage/gujratiFoodViewPage');
        }
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error", e);
    }
}

// delete dish logic 
module.exports.gujratiDishDelete = async (req, res) => {
    try {
        const deletedDish = await gujrati.findByIdAndDelete(req.params.id);

        fs.unlink(deletedDish.dish_image, () => { });

        if (!deletedDish) {
            console.log("Dish deletion failed...");
            return res.redirect('/addGujratiDishPage/gujratiFoodViewPage');
        }

        console.log("Dish delete successfully...");
        return res.redirect('/addGujratiDishPage/gujratiFoodViewPage');
    } catch (e) {
        console.log("Something went wrong");
        console.log("Error", e);
    }
}