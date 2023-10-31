const inquirer = require("inquirer");
const welcome = require("./lib/tools.js");
const questions = require("./lib/questions.js");
const handler = require("./lib/controller.js");

async function main() {
    welcome("This is CMS system for employee information.")
    while(true) {
        await inquirer
        .prompt(questions)
        .then(answers => handler(answers))
        .catch(err => console.error(err));
    }
}

main();
