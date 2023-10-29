const chalk = require("chalk");

function welcome(msg) {
    // show welcome msg
    console.log(`
    
    
    ${chalk.bgBlue(msg)}
    
    
    `);
}

module.exports = welcome;

