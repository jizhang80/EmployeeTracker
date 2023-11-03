const Role = require('./role.js')
const inquirer = require('inquirer');
const Department = require('./department.js')
const db = require("./db/connection.js");
const {sendAlert, sendDone, cliPrinter} = require('./tools.js')

module.exports = class Employee {
    constructor (id, firstName, lastName, role, manager) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.manager = manager;
    }

    static async getAll() {
        // get all employee
        // employee ids, first names, last names, job titles, departments, salaries, and managers
        return await db.promise()
        .query(`SELECT 
                e.id AS EMPLOYEE_ID,
                e.first_name AS FIRST_NAME,
                e.last_name AS LAST_NAME,
                r.title AS JOB_TITLE,
                d.name AS DPARTMENT,
                r.salary AS SALARY,
                CONCAT_WS(' ', m.first_name, m.last_name) AS MANAGER
            FROM employee AS e
            INNER JOIN role AS r 
            ON r.id = e.role_id
            INNER JOIN department AS d
            ON r.department_id = d.id
            INNER JOIN employee AS m
            ON e.manager_id = m.id`
         )
        .then(results=>cliPrinter(results[0]));
    }

    static async getAllEmployeeNames() {
        // return a list of employees name, first_name last_name
        let nameList = [];
        await db.promise()
        .query(`SELECT 
                CONCAT_WS(' ', e.first_name, e.last_name) AS employee_name
            FROM employee AS e`)
        .then(results=>{
            for (let i of results[0]) {
                nameList.push(i.employee_name)
            }
        });
        return nameList;
    }

    static async getAllManagersList() {
        let managerList = [];
        await db.promise()
        .query(`SELECT 
                CONCAT_WS(' ', m.first_name, m.last_name) AS manager_name
            FROM employee AS m
            INNER JOIN employee AS e
            ON m.id = e.manager_id`)
        .then(results=>{
            for (let i of results[0]) {
                managerList.push(i.manager_name)
            }
        });
        return managerList;
    }

    static async getEmployeesByManager() {
        // get employees by manager
        await inquirer
        .prompt(Employee.getViewEmployeeByManagerQuestionList())
        .then(async answers=>{
            const list = /(\w+)( )(\w+)/.exec(answers.manager);
            await db.promise()
            .execute(`SELECT 
                        e.id AS EMPLOYEE_ID,
                        CONCAT_WS(' ', e.first_name, e.last_name) AS EMPLOYEE_NAME,
                        r.salary AS SALARY
                        FROM employee AS e
                        INNER JOIN role AS r
                        ON e.role_id = r.id
                        INNER JOIN employee AS m
                        ON e.manager_id = m.id
                        WHERE m.first_name = ? AND m.last_name = ?`, [list[1], list[3]]
            ).catch(err=>sendAlert(err));
        })
    }

    static async deleteEmployee() {
        // delete employee
        await inquirer
        .prompt(await Employee.getDelEmployeeQuestionList())
        .then(async answers=>{
            if (answers.confirm === false) return;
            const list = /(\w+)( )(\w+)/.exec(answers.employee);
            await db.promise()
            .execute(`DELETE 
                        FROM employee AS e
                        WHERE e.first_name = ? AND e.last_name = ?`, [list[1], list[3]]
            ).then(sendDone(`DELETE employee ${list[1]} ${list[3]} successfully!`))
            .catch(err=>sendAlert(err));
        });
    }

    static async addEmployee() {
        // add employee
        await inquirer
        .prompt(await Employee.getAddEmployeeQuestionList())
        .then(async answers => {
            const listRole = /(\w+)( of )(\w+)/.exec(answers.role); // r.title = listRole[1], d.name = listRolr[3]
            const listName = /(\w+)( )(\w+)/.exec(answers.manager);
            let roleId, managerId;
            await db.promise()
            .execute(`select r.id as roleid
                        from role as r
                        inner join department as d
                        on r.department_id = d.id
                        where r.title = ? and d.name = ?`, [listRole[1], listRole[3]])
            .then(results=>{
                roleId = results[0][0].roleid
            })
            await db.promise()
            .execute(`select id
                        from employee
            where first_name = ? and last_name = ?`, [listName[1], listName[3]])
            .then(results=>{
                managerId = results[0][0].id
            })
            await db.promise()
            .execute(`
            INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES (?,?,?,?)`
            , [answers.firstName, answers.lastName, roleId, managerId] )
            sendDone(`Add employee ${answers.firstName} ${answers.lastName} successfully.`)
        }).catch(err=>sendAlert(err))
    }

    static async updateEmployeeRole() {
        // update employee role
        await inquirer
        .prompt(await Employee.getUpdateEmployeeRoleQuestionList())
        .then(async answers=>{
            const listRole = /(\w+)( of )(\w+)/.exec(answers.role); // r.title = listRole[1], d.name = listRolr[3]
            const listName = /(\w+)( )(\w+)/.exec(answers.employee);
            let roleId;
            await db.promise()
            .execute(`SELECT r.id AS id from role AS r 
            INNER JOIN department AS d
            ON r.department_id = d.id
            where r.title = ? AND d.name = ?`, [listRole[1], listRole[3]])
            .then(results=>{
                roleId = results[0][0].id
            })
            await db.promise()
            .execute(`UPDATE employee AS e
                    SET e.role_id = ?
                    WHERE e.first_name = ? and e.last_name = ?
            `, [roleId, listName[1], listName[3]])
            .then(sendDone(`UPDATE ${listName[1]} ${listName[3]} successfully!`))
            .catch(err=>sendAlert(err))
        })
    }

    static async updateEmployeeManager() {
        // update employee manager
        await inquirer
        .prompt(await Employee.getUpdateEmployeeManagerQuestionList())
        .then(async answers=>{
            const listEmployee = /(\w+)( )(\w+)/.exec(answers.employee);
            const listManager = /(\w+)( )(\w+)/.exec(answers.manager);
            let managerId;
            await db.promise()
            .execute(`SELECT id from employee
            where first_name = ? AND last_name = ?`, [listManager[1], listManager[3]])
            .then(results=>{
                managerId = results[0][0].id
            })
            await db.promise()
            .execute(`UPDATE employee AS e
                    SET e.manager_id = ?
                    WHERE e.first_name = ? and e.last_name = ?
            `, [managerId, listEmployee[1], listEmployee[3]])
            .then(sendDone(`UPDATE ${listEmployee[1]} ${listEmployee[3]} successfully!`))
            .catch(err=>sendAlert(err))
        })
    }

    static async viewEmployeeByManager() {
        // view employee by manager
        await inquirer
        .prompt(await Employee.getViewEmployeeByManagerQuestionList())
        .then(async answers=>{
            const listManager = /(\w+)( )(\w+)/.exec(answers.manager);
            await db.promise()
        .query(`SELECT 
                e.id AS EMPLOYEE_ID,
                e.first_name AS FIRST_NAME,
                e.last_name AS LAST_NAME,
                r.title AS JOB_TITLE,
                d.name AS DPARTMENT,
                r.salary AS SALARY,
                CONCAT_WS(' ', m.first_name, m.last_name) AS MANAGER
            FROM employee AS e
            INNER JOIN role AS r 
            ON r.id = e.role_id
            INNER JOIN department AS d
            ON r.department_id = d.id
            INNER JOIN employee AS m
            ON e.manager_id = m.id
            WHERE m.first_name = ? and m.last_name = ?`, [listManager[1], listManager[3]]
         )
        .then(results=>cliPrinter(results[0]));
        })
    }

    static async getAddEmployeeQuestionList() {
        const roles = await Role.getAllRoleName();
        const employees = await Employee.getAllEmployeeNames();
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
                choices: roles,
            },
            {
                type: 'list',
                name: 'manager',
                message: 'please choose the manager for employee: ',
                choices: employees,
            }
        ];
    }

    static async getUpdateEmployeeRoleQuestionList() {
        const employees = await Employee.getAllEmployeeNames();
        const roles = await Role.getAllRoleName();
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

    static async getUpdateEmployeeManagerQuestionList() {
        const employees = await Employee.getAllEmployeeNames();
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
                message: 'please choose the new manager for the employee: ',
                choices: employees
            }
        ];
    }

    static async getViewEmployeeByManagerQuestionList() {
        const managers = await Employee.getAllManagersList();
        return [
            {
                type: 'list',
                name: 'manager',
                message: 'please choose the manager: ',
                choices: managers
            }
        ];
    }

    static async getDelEmployeeQuestionList() {
        const employees = await Employee.getAllEmployeeNames();
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