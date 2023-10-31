const inquirer = require("inquirer");

const questions = [
    {
        type: 'list',
        name: 'todo',
        message: 'What would you like to do? ',
        choices: [
            new inquirer.Separator(' --- departments --- '),
            'View all departments', 
            'Add a department',
            'Delete a department',
            'View employees by department',
            'Show the total utilized budget',
            new inquirer.Separator(' --- roles --- '),
            'View all roles',
            'Add a role',
            'Delete a role',
            new inquirer.Separator(' --- employees --- '),
            'View all employees',
            'Add an employee',
            'Delete an employee',
            'Update an employee role',
            'Update an employee manager',
            'View employees by manager',
            new inquirer.Separator(),
            'QUIT'
        ]
    }
]
module.exports = questions;