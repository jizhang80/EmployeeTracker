const {v4: uuidv4} = require('uuid');
const Department = require('./department.js')

module.exports = class Role {
    constructor(id, name, salary, department) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    static createRole(name, salary, department) {
        const id = uuidv4();
        return new Role(id, name, salary, department);
    }

    static getAll() {
        //return all the roles
    }

    changeRoleDep(department) {
        // change role department
    }

    static addRole() {
        // todo
    }

    static delRole() {
        // todo
    }

    static getAddRoleQuestionList() {
        const departments = Department.getAll();
        return [
            {
                // input text at least 3 char
                type: 'input',
                name: 'roleName',
                message: 'Please input the role name: ',
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
                name: 'salary',
                message: 'Please input the role salary: ',
                validate(value) {
                    // valid number TBD
                },
            },
            {
                type: 'list',
                name: 'department',
                message: 'please choose the department for the role: ',
                choices: departments
            }
        ];
    }

    static getDeleteRoleQuestionList() {
        const roles = Role.getAll();
        return [
            {
                type: 'list',
                name: 'roles',
                message: 'please choose a role: ',
                choices: [] // need update by db query
            }
        ];
    }
}