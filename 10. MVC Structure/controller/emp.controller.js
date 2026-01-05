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

// view all employee page 
module.exports.viewAllEmployee = async (req, res) => {
    const allEmp = await employee.find();
    // console.log(allEmp)
    if (allEmp) {
        console.log("Employees data found...")
    }
    else {
        console.log("Employees data not found...");
    }

    res.render('viewAllEmployee', { allEmp });
}

// edit employee
module.exports.editEmp = async (req, res) => {
    const findEmp = await employee.findById(req.params.id);
    // console.log(findEmp);

    // if employee data not found this boc will execute 
    if (!findEmp) {
        console.log("Employee not found");
        return res.redirect('/viewAllEmployee');
    }

    // if employee data found this boc will execute 
    console.log("Employee data found");
    return res.render('empEditForm', { findEmp });
}

// update employee 
module.exports.updateEmp = async (req, res) => {
    // console.log(req.params);
    const updatedEmp = await employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(updatedEmp);

    if (!updatedEmp) {
        console.log("Emp not updated");
        return res.redirect('/editEmp');
    }

    console.log("Employee added successfully");
    return res.redirect('/empForm/viewAllEmployee');
}

// delete employee logic 
module.exports.deleteEmp = async (req, res) => {
    // console.log(req.params.id);
    const deletedUser = await employee.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
        console.log("User not deleted");
        return res.redirect('/viewAllEmployee');
    }

    console.log("Employee deleted successfully");
    return res.redirect('/empForm/viewAllEmployee');
}