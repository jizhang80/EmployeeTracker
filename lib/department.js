const {v4: uuidv4} = require('uuid');
const inquirer = require('inquirer');

module.exports = class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static createByName(name) {
        const id = uuidv4();
        return new Department(id, name);
    }

    static getAll() {
        //get all the department 
        return;
    }

    saveDep() {
        // db save Department
    }

    delDep() {

    }

    static addDepartment() {
        inquirer
        .prompt(Department.inputDepartmentName)
        .then(answers => {
            const newDep = Department.createByName(answers.departmentName);
            newDep.delDep();
            console.log(`Add department ${answers.departmentName} successfully.`)
        })
    }

    static delDepartment() {
        inquirer
        .prompt(Department.getChooseDepartmentQ())
        .then(answers => {
            const dep = Department.createByName(answers.departmentName);
            dep.delDep();
            console.log(`Delete department ${answers.departmentName} successfully.`)
        })
    }

    static inputDepartmentName = [
        {
            // input text at least 3 char
            type: 'input',
            name: 'departmentName',
            message: 'Please input the department name: ',
            validate(value) {
                if (value.length < 3 || !value) {
                    return 'Please enter at least 3 characters.';
                }
                return true;
            },
        }
    ]

    static getChooseDepartmentQ() {
        const allDep = Department.getAll();
        return [
            {
                type: 'list',
                name: 'departmentName',
                message: 'please choose the action for employees: ',
                choices: allDep
            }
        ]
    }

    static showEmployeesByDepartment() {
        // todo
    }

    static showUtilizedByDepartment() {
        // todo
    }

    
}