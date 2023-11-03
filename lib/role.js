const {v4: uuidv4} = require('uuid');
const inquirer = require('inquirer');
const Department = require('./department.js')
const db = require("./db/connection.js");
const {sendAlert, sendDone, cliPrinter} = require('./tools.js')

module.exports = class Role {
    constructor(id, name, salary, department) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    static async getAll() {
        //return all the role information
        return await db.promise()
        .query(`SELECT 
                r.id AS ROLE_ID,
                r.title AS JOB_TITLE,
                d.name AS DEPARTMENT,
                r.salary AS SALARY
            FROM role AS r
            INNER JOIN department AS d
            ON r.department_id = d.id`
         )
        .then(results=>cliPrinter(results[0]));
    }

    static async getAllRoleName() {
        //get all role name list
        let roleList = [];
        await db.promise()
        .query(`SELECT 
                CONCAT_WS(' of ', r.title, d.name) AS TITLE_DEPARTMENT
            FROM role AS r
            INNER JOIN department AS d 
            ON r.department_id = d.id`)
        .then(results=>{
            for (let i of results[0]) {
                roleList.push(i.TITLE_DEPARTMENT)
            }
        });
        return roleList;
    }

    static async addRole() {
        await inquirer
        .prompt(Role.getAddRoleQuestionList())
        .then(async answers => {
            await db.promise()
            .execute(`INSERT INTO role (title, salary, department_id) 
            VALUES (?,?,(select department_id from department where name = ?))`
            , [answers.roleName, answers.salary, answers.department])
            sendDone(`Add role ${answers.roleName} successfully.`)
        }).catch(err=>sendAlert(err))
    }

    static async delRole() {
        await inquirer
        .prompt(await Role.getDeleteRoleQuestionList())
        .then(async answers => {
            // answers.role is like Manager of Development
            // get role and department name first
            const list = /(\w+)( of )(\w+)/.exec(answers.role);
            console.log(list, list[1], list[3])
            await db.promise()
            .execute(`DELETE r 
                FROM role AS r
                LEFT JOIN department AS d
                ON d.id = r.department_id
                WHERE r.title = ? AND d.name = ? `, [list[1], list[3]])
            .then(sendDone(`Delete role ${list[1]} in department ${list[3]} sucessfully!`))
            .catch(err=>sendAlert(err));
        })
    }

    static getAddRoleQuestionList() {
        const departments = Department.getAllDepName();
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
                    // salary is a number and greater than 0
                    if (value > 0 && !isNaN(value)) return true;
                    return false;
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

    static async getDeleteRoleQuestionList() {
        const roles = await Role.getAllRoleName();
        return [
            {
                type: 'list',
                name: 'role',
                message: 'please choose a role: ',
                choices: roles
            }
        ];
    }
}