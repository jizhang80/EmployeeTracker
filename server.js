const inquirer = require("inquirer");
const {sendWelcome} = require("./lib/tools.js");
const questions = require("./lib/questions.js");
const handler = require("./lib/controller.js");

async function main() {
    sendWelcome("This is CMS system for employee information.")
    while(true) {
        await inquirer
        .prompt(questions)
        .then(answers => handler(answers))
        .catch(err => console.error(err));
    }
}

main();
