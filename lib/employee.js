module.exports = class Employee {
    constructor (id, firstName, lastName, role, manager) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.manager = manager;
    }
}