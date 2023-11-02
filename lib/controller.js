const Department = require('./department.js');
const Role = require('./role.js');
const Employee = require('./employee.js')

// question controller, handle from user choice to next action
module.exports = async function handler(answers) {
    switch (answers.todo) {
        case 'QUIT':
            process.exit(0);
        // departments
        case 'View all departments':
            await Department.getAll()
            break;
        case 'Add a department':
            await Department.addDepartment();
            break;
        case 'Delete a department':
            await Department.delDepartment();
            break;
        case 'View employees by department':
            await Department.showEmployeesByDepartment();
            break;
        case 'Show the total utilized budget':
            await Department.showUtilizedByDepartment();
            break;
        case 'View all roles':
            await Role.getAll();
            break;
        case 'Add a role':
            await Role.addRole();
            break;
        case 'Delete a role':
            await Role.delRole();
            break;
        case 'View all employees':
            await Employee.getAll();
            break;
        case 'Add an employee':
            await Employee.addEmployee();
            break;
        case 'Delete an employee':
            await Employee.deleteEmployee();
            break;
        case 'Update an employee role':
            await Employee.updateEmployeeRole();
            break;
        case 'Update an employee manager':
            await Employee.updateEmployeeManager();
            break;
        case 'View employees by manager':
            await Employee.viewEmployeeByManager();
            break;
    }
}

