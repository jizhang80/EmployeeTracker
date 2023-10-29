// question controller, handle from answer to next question
module.exports = class Controller {
    constructor() {
        // start from root questions
        this.state = 'root';
    }

    stateHandler(answers) {
        if (answers.root){
            this.state = answers.root;
            return;
        }

        if (answers.departments) {
            this.state = answers.departments;
            return;
        }

        if (answers.roles) {
            this.state = answers.roles;
            return;
        }

        if (answers.employees) {
            this.state = answers.employees;
            return;
        }

        this.state = 'root';
    }
}

