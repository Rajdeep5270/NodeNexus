const employee = require('../models/emp.model');

const empFormPage = (req, res) => {
    res.render('empForm');
}

const addUser = async (req, res) => {
    // console.log(req.body);
    const empAdded = await employee.create(req.body);

    if (empAdded) {
        console.log("Employee details insertion successfully...");
    }
    else {
        console.log("Employees details insertion failed...");
    }

    res.redirect('/empForm/')
}

module.exports = {
    empFormPage,
    addUser
};