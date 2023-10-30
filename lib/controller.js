const inquirer = require('inquirer');

// question controller, handle from answer to next question
module.exports = class Controller {
    constructor() {
        // start from root questions
        this.state = 'root';
    }

    static rootQuestionList = [
        {
            type: 'list',
            name: 'root',
            message: 'please choose a management module: ',
            choices: ['departments', 'roles', 'employees', 'quit']
        }
    ];

    reset() {
        this.state = 'root';
    }

    

    stateHandler(answers) {
        if (answers.root){
            this.state = answers.root;
            return;
        }

        if (answers.departments) {
            this.state = answers.departments;
            return;
        }

        if (answers.roles) {
            this.state = answers.roles;
            return;
        }

        if (answers.employees) {
            this.state = answers.employees;
            return;
        }

        this.state = 'root';
    }

    static router = {
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

    static async nextAction(action) {
        // inquirer ask questions
        const answers = await inquirer
            .prompt(questions)
            .then((answers)=>{return answers});
        return answers;
    }
}

