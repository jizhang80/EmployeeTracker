const welcome = require("./lib/tools.js");
const {rootQ, departmentsQ, rolesQ, employeesQ, qList, askQuestion} = require("./lib/questions.js");
const Controller = require("./lib/controller.js");

const ctlr = new Controller();

async function main() {
    while(ctlr.state !== 'quit') {
        const answers = await askQuestion(qList(ctlr.state));
        ctlr.handler(answers);
    }
}


