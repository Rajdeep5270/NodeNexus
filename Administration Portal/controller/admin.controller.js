const Admin = require('../models/admin.model');

module.exports.loginPage = async (req, res) => {
    try {
        const adminCredentials = await Admin.findById(req.cookies.adminId);

        console.log(adminCredentials);

        if (adminCredentials && req.cookies.adminId) {
            console.log("You are logged in");
            return res.redirect('/dashboard');
        }

        return res.render('auth/login');
    }
    catch (e) {
        console.log("Something went wrong");
        console.log(e);
        return res.render('auth/login');
    }
}

module.exports.loginLogic = async (req, res) => {
    try {
        const adminCredentials = await Admin.findOne({ email: req.body.email });

        if (!adminCredentials) {
            console.log("Admin not found...");
            return res.redirect('/');
        }

        if (req.body.password !== adminCredentials.password) {
            console.log("Admin password not matched...");
            return res.redirect('/');
        }

        res.cookie("adminId", adminCredentials.id);
        console.log("Admin found successfully...");
        return res.redirect('/dashboard');
        // console.log(adminCredentials);
    }
    catch (e) {
        console.log("Something went wrong");
        console.log(e);
        return res.redirect('/');
    }
}

module.exports.dashboardPage = (req, res) => {
    return res.render('dashboard');
}

// add new admin page 
module.exports.addNewAdminPage = (req, res) => {
    return res.render('admin/addNewAdminPage');
}

// view admin page route 
module.exports.viewAdminPage = (req, res) => {
    return res.render('admin/viewAdminPage')
}

// add new admin logic 
module.exports.addAdmin = async (req, res) => {
    // console.log(req.file);
    req.body.profileImage = req.file.path;

    const adminAdded = await Admin.create(req.body);

    if (!adminAdded) {
        console.log("Admin not Added");
        return res.redirect('/addNewAdminPage');
    }

    console.log("Admin added successfully...");
    return res.redirect('/dashboard');
};