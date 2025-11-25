const { add, sub } = require('./Modules/math');

console.log(add(50, 20));
console.log(sub(70, 50));

const students = {
    name: "Rajdeep",
    age: 20,
    course: "MERN"
}

let { name, age, course } = students;


console.log(`student name : ${name}`);
console.log(`student age : ${age}`);
console.log(`student course : ${course}`);
