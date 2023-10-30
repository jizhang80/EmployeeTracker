const {v4: uuidv4} = require('uuid');
const Role = require('./role.js')

module.exports = class Employee {
    constructor (id, firstName, lastName, role, manager) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.manager = manager;
    }

    static createEmployee(firstName, lastName, role, manager) {
        const id = uuidv4();
        return new Employee(id, firstName, lastName, role, manager);
    }

    static getAll() {
        // get all employee
    }

    static getEmployeesByManager(manager) {
        // get employees by manager
    }

    static deleteEmployee(employee) {
        // delete employee
    }

    static employeesQuestionList = [
        {
            type: 'list',
            name: 'employees',
            message: 'please choose the action for employees: ',
            choices: [
                'View all employees',
                'Add an employee',
                'Delete an employee',
                'update an employee role',
                'update an employee manager',
                'view employees by manager'
            ]
        }
    ];

    static getAddEmployeeQuestionList() {
        const roles = Role.getAll();
        const employees = Employee.getAll();
        return [
            {
                // input text at least 3 char
                type: 'input',
                name: 'firstName',
                message: 'Please input the first name: ',
                validate(value) {
                    if (value.length < 3 || !value) {
                        return 'Please enter at least 3 characters.';
                    }
                    return true;
                },
            },
            {
                // input text at least 3 char
                type: 'input',
                name: 'lastName',
                message: 'Please input the last name: ',
                validate(value) {
                    if (value.length < 3 || !value) {
                        return 'Please enter at least 3 characters.';
                    }
                    return true;
                },
            },
            {
                type: 'list',
                name: 'role',
                message: 'please choose the role for employee: ',
                choices: roles
            },
            {
                type: 'list',
                name: 'manager',
                message: 'please choose the manager for employee: ',
                choices: employees
            }
        ];
    }

    static getUpdateEmployeeRoleQuestionList() {
        const employees = Employee.getAll();
        const roles = Role.getAll();
        return [
            {
                type: 'list',
                name: 'employee',
                message: 'please choose the employee: ',
                choices: employees
            },
            {
                type: 'list',
                name: 'role',
                message: 'please choose the role for the employee: ',
                choices: roles
            }
        ];
    }

    static getUpdateEmployeeManagerQuestionList() {
        const employees = Employee.getAll();
        return [
            {
                type: 'list',
                name: 'employee',
                message: 'please choose the employee: ',
                choices: employees
            },
            {
                type: 'list',
                name: 'manager',
                message: 'please choose the manager for the employee: ',
                choices: employees
            }
        ];
    }

    static getViewEmployeeByManagerQuestionList() {
        const employees = Employee.getAll();
        return [
            {
                type: 'list',
                name: 'employee',
                message: 'please choose the manager: ',
                choices: employees
            }
        ];
    }

    static getDelEmployeeQuestionList() {
        const employees = Employee.getAll();
        return [
            {
                type: 'list',
                name: 'employee',
                message: 'please choose the employee to be delete: ',
                choices: employees
            },
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Are you sure to delete this employee? '
            }
        ];
    }
}