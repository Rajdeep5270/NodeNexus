const employee = require('../models/emp.model');

module.exports.empFormPage = (req, res) => {
    res.render('empForm');
}

module.exports.addEmp = async (req, res) => {
    // console.log(req.body);
    const empAdded = await employee.create(req.body);

    if (empAdded) {
        console.log("Employee details insertion successfully...");
    }
    else {
        console.log("Employees details insertion failed...");
    }

    res.redirect('/empForm/');
}

module.exports.viewAllEmployee = async (req, res) => {
    const allEmp = await employee.find();
    console.log(allEmp)
    if (allEmp) {
        console.log("Employees data found...")
    }
    else {
        console.log("Employees data not found...");
    }

    res.render('viewAllEmployee', { allEmp });
}