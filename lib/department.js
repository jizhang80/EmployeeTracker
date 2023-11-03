const inquirer = require('inquirer');
const db = require("./db/connection.js");
const {sendAlert, sendDone, cliPrinter} = require('./tools.js')

module.exports = class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async getAll() {
        //get all the department table information
        return await db.promise()
        .query("SELECT * FROM department")
        .then(results=>cliPrinter(results[0]));
    }

    static async getAllDepName() {
        //get all department name list
        let depNameList = [];
        await db.promise()
        .query("SELECT name FROM department")
        .then(results=>{
            for (let i of results[0]) {
                depNameList.push(i.name)
            }
        });
        return depNameList;
    }

    static async addDepartment() {
        await inquirer
        .prompt(Department.inputDepartmentName)
        .then(async answers => {
            await db.promise()
            .execute("INSERT INTO department (name) VALUES (?)", [answers.departmentName])
            sendDone(`Add department ${answers.departmentName} successfully.`)
        }).catch(err=>sendAlert(err))
    }

    static async delDepartment() {
        await inquirer
        .prompt(await Department.getChooseDepartmentQ())
        .then(async answers => {
            await db.promise()
            .execute("DELETE from department where name=?", [answers.departmentName])
            sendDone(`Delete department ${answers.departmentName} successfully.`)
        }).catch(err=>sendAlert(err))
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

    static async getChooseDepartmentQ() {
        const depList = await Department.getAllDepName();
        return [
            {
                type: 'list',
                name: 'departmentName',
                message: 'please choose the department: ',
                choices: depList
            }
        ]
    }

    static async showEmployeesByDepartment() {
        await inquirer
        .prompt(await Department.getChooseDepartmentQ())
        .then(async answers=>{
            await db.promise()
            .execute(`
            SELECT 	e.id AS "EMPLOYEE ID", 
                    e.first_name AS "FIRST NAME", 
                    e.last_name AS "LAST NAME", 
                    r.title AS "JOB TITLE",
                    d.name AS "DEPARTMENT",
                    r.salary AS "SALARY",
                    CONCAT_WS(' ', m.first_name, m.last_name)  AS "MANAGER"
            FROM employee AS e
            INNER JOIN role AS r ON e.role_id = r.id
            INNER JOIN department AS d ON r.department_id = d.id and d.name = ?
            INNER JOIN employee AS m ON e.manager_id = m.id;
            `, [answers.departmentName])
            .then(results=>cliPrinter(results[0]))
        })
    }

    static async showUtilizedByDepartment() {
        await inquirer
        .prompt(await Department.getChooseDepartmentQ())
        .then(async answers=>{
            await db.promise()
            .execute(`
            SELECT 	sum(r.salary)  AS "TOTAL BUDGET"
            FROM employee AS e
            INNER JOIN role AS r ON e.role_id = r.id
            INNER JOIN department AS d ON r.department_id = d.id and d.name = ?
            INNER JOIN employee AS m ON e.manager_id = m.id;
            `, [answers.departmentName])
            .then(results=>cliPrinter(results[0]))
        })
    }

    
}