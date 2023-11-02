const chalk = require("chalk");
const { printTable } = require('console-table-printer');

function sendWelcome(msg) {
    // show welcome msg
    console.log(`
    

    ${chalk.bgBlue(msg)}
    

    `);
}

function sendAlert(msg) {
    // show welcome msg
    console.error(`
    
    ${chalk.bgYellow(msg)}
    
    `);
}

function sendDone(msg) {
    // show welcome msg
    console.log(`
    
    ${chalk.bgGreen(msg)}
    
    `);
}

function cliPrinter(obj) {
    if (obj.length === 0) {
        sendAlert("No Employee in this department!")
        return;
    }
    printTable(obj);
}

module.exports = {sendWelcome,sendAlert,sendDone, cliPrinter};

