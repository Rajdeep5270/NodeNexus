const admin = require('../models/admin.model');
const fs = require('fs');

module.exports.loginPage = async (req, res) => {
    const adminFound = await admin.findById(req.cookies.adminId);

    if (req.cookies.adminId && adminFound) {
        return res.redirect('/dashboardPage');
    }

    return res.render('auth/loginPage');
}


// admin login logic 
module.exports.adminLogin = async (req, res) => {
    try {
        const adminFound = await admin.findOne({ email: req.body.email });

        if (!adminFound) {
            console.log("Admin not found...");
            return res.redirect('/');
        };

        // for debugging 
        // console.log(req.body.password);
        // console.log(adminFound.password);

        if (req.body.password !== adminFound.password) {
            console.log("Password not match");
            return res.redirect('/');
        };

        res.cookie("adminId", adminFound.id);

        console.log("Admin login successfully...");
        return res.redirect('/dashboardPage');
    } catch (e) {
        console.log("Admin Data Not Found");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// admin logout logic 
module.exports.logout = (req, res) => {
    res.clearCookie('adminId');
    res.redirect('/');
}

module.exports.dashboardPage = async (req, res) => {
    const findAdmin = await admin.findById(req.cookies.adminId);

    if (req.cookies.adminId == undefined && !findAdmin) {
        return res.redirect('/');
    }

    return res.render('dashboard');
}


module.exports.viewAdminPage = async (req, res) => {
    try {
        const findAdmin = await admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !findAdmin) {
            return res.redirect('/');
        }

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

// add admin form page rendering 
module.exports.addAdminFormPage = async (req, res) => {
    const findAdmin = await admin.findById(req.cookies.adminId);

    if (req.cookies.adminId == undefined && !findAdmin) {
        return res.redirect('/');
    }

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
    }
    catch (e) {
        console.log("Admin not added");
        console.log("Error : ", e);
        res.redirect('/notFound')
    }
    return res.redirect("/viewAdminPage");
}

// delete admin logic 
module.exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await admin.findByIdAndDelete(req.params.id);
        console.log(deletedAdmin);

        if (!deletedAdmin) {
            console.log("Admin not deleted");
            return res.redirect('/notFound')
        }

        fs.unlink(deletedAdmin.profileImage, () => { });
        console.log("Admin deleted successfully");
        res.redirect('/viewAdminPage');
    } catch (e) {
        console.log("Admin not added");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

//edit admin logic 
module.exports.editAdmin = async (req, res) => {
    // console.log(req.params);
    const editAdmin = await admin.findById(req.params.id);

    res.render('editForm', { editAdmin });
}

// update admin logic
module.exports.updateAdmin = async (req, res) => {
    try {
        // console.log(req.file);
        if (req.file) {
            console.log(req.file.path);
            req.body.profileImage = req.file.path;

            const updatedAdmin = await admin.findByIdAndUpdate(req.params.id, req.body);

            fs.unlink(updatedAdmin.profileImage, () => { });

            if (!updatedAdmin) {
                console.log("Admin not updated");
                return res.redirect('/editAdmin')
            }

            console.log("Admin updated successfully");
        }
        else {
            const updatedAdmin = await admin.findByIdAndUpdate(req.params.id, req.body);

            if (!updatedAdmin) {
                console.log("Admin not updated");
                return res.redirect('/editAdmin')
            }

            console.log("Admin updated successfully");
        }

        return res.redirect('/viewAdminPage')
    } catch (e) {
        console.log("Admin not added");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}