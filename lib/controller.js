const inquirer = require('inquirer');
const Department = require('./department.js');
const Role = require('./role.js');
const Employee = require('./employee.js')

// question controller, handle from user choice to next action
module.exports = function handler(answers) {
    switch (answers.todo) {
        case 'QUIT':
            process.exit(0);
        // departments
        case 'View all departments':
            Department.getAll();
            break;
        case 'Add a department':
            Department.addDepartment();
            break;
        case 'Delete a department':
            Department.delDepartment();
            break;
        case 'View employees by department':
            Department.showEmployeesByDepartment();
            break;
        case 'Show the total utilized budget':
            Department.showUtilizedByDepartment();
            break;
        case 'View all roles':
            Role.getAll();
            break;
        case 'Add a role':
            Role.addRole();
            break;
        case 'Delete a role':
            Role.delRole();
            break;
        case 'View all employees':
            Employee.getAll();
            break;
        case 'Add an employee':
            Employee.addEmployee();
            break;
        case 'Delete an employee':
            Employee.deleteEmployee();
            break;
        case 'Update an employee role':
            Employee.updateEmployeeRole();
            break;
        case 'Update an employee manager':
            Employee.updateEmployeeManager();
            break;
        case 'View employees by manager':
            Employee.viewEmployeeByManager();
            break;
    }
}

