const admin = require('../models/admin.model');
const fs = require('fs');

module.exports.dashboardPage = (req, res) => {
    return res.render('dashboard');
}

module.exports.viewAdminPage = async (req, res) => {
    try {
        const allAdminData = await admin.find();

        if (!allAdminData) {
            console.log("Admin Data Not Found");
            res.redirect('/notFound');
        }

        console.log("Admin Data Found")
        return res.render('viewAll', { allAdminData });

    } catch (e) {
        console.log("Admin Data Not Found");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

module.exports.addAdminFormPage = (req, res) => {
    return res.render('addForm');
}

// error page rendering 
module.exports.notFound = (req, res) => {
    return res.render('error');
}

// admin details adding logic  && image uploading 
module.exports.addEmployeeDetails = async (req, res) => {
    try {
        // image adding logic before add admin 
        // console.log(req.file);
        req.body.profileImage = req.file.path;

        const adminAdded = await admin.create(req.body);

        if (!adminAdded) {
            console.log("Admin Insertion Unsuccessfull...");
            return res.redirect('/notFound');
        }

        console.log("Admin Added Successfully...");
        res.redirect("/");
    }
    catch (e) {
        console.log("Admin not added");
        console.log("Error : ", e);
        res.redirect('/notFound')
    }
}

// delete admin logic 
module.exports.deleteAdmin = async (req, res) => {
    try {
        // image deletion logic 
        const imagePath = await admin.findById(req.params.id);
        fs.unlink(imagePath.profileImage, e => { });

        const deletedAdmin = await admin.findByIdAndDelete(req.params.id);
        console.log(deletedAdmin);

        if (!deletedAdmin) {
            console.log("Admin not deleted");
            return res.redirect('/notFound')
        }


        console.log("Admin deleted successfully");
        res.redirect('/viewAdminPage');
    } catch (e) {
        console.log("Admin not added");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}