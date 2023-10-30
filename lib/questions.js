const inquirer = require('inquirer');

const rootQ = [
    {
        type: 'list',
        name: 'root',
        message: 'please choose a management module: ',
        choices: ['departments', 'roles', 'employees', 'quit']
    }
];

const qList = {
    'quit': 'quit',
    'root': rootQ,
    'departments': departmentsQ,
    'roles': rolesQ,
    'employees': employeesQ,
    'View all departments': showAllDepartments, // db action function
    'Add a department': inputDepartmentName, 
    'View employees by department': selectDepartment,
    'Delete a department': selectDepartment,
    'Show the total utilized budget': selectDepartment,
    'View all roles': showAllRoles, // db action function
    'Add a role': addRole, 
    'Delete a role': deleteRole,
    'View all employees': showAllEmployees, // db action function
    'Add an employee': addEmployee,
    'Delete an employee': deleteEmployee,
    'update an employee role': updateEmployeeRole,
    'update an employee manager': updateEmployeeManager,
    'view employees by manager': showEmployeesByManager
}

async function askQuestion(questions) {
    // inquirer ask questions
    const answers = await inquirer
        .prompt(questions)
        .then((answers)=>{return answers});
    return answers;
}

module.exports = {rootQ, departmentsQ, rolesQ, employeesQ, qList, askQuestion};