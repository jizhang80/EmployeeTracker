const {v4: uuidv4} = require('uuid');

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

    static departmentsQuestionList = [
        {
            type: 'list',
            name: 'departments',
            message: 'please choose the action for departments: ',
            choices: [
                'View all departments',
                'Add a department',
                'View employees by department',
                'Delete a department',
                'Show the total utilized budget'
            ]
        }
    ];

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
        const allDep = this.getAll();
        return [
            {
                type: 'list',
                name: 'department',
                message: 'please choose the action for employees: ',
                choices: allDep
            }
        ]
    }

    
}