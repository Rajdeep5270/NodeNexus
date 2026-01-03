const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    employeeName: {
        type: String,
        required: true,
    },
    employeeEmail: {
        type: String,
        required: true,
    },
    employeeRole: {
        type: String,
        required: true,
    },
    employeeSalary: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    hobbies: {
        type: Array,
        required: true,
    },
    employeeNotes: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Employee", empSchema, "Employee");