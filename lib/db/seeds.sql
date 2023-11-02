-- department data
INSERT INTO department (name) 
VALUES ("Chef"),
        ("Development"),
        ("Sales"),
        ("Operation");

-- role data
INSERT INTO role (title, salary, department_id) 
VALUES ("CEO", 1, 1),
       ("CFO", 1, 1),
       ("Manager", 5000, 2),
       ("Band10", 5000, 2),
       ("Band9", 4000, 2),
       ("Band8", 3000, 2),
       ("Manager", 5000, 3),
       ("Band10", 4000, 3),
       ("Band9", 3000, 3),
       ("Band8", 2000, 3),
       ("Manager", 5000, 4),
       ("Band10", 4000, 4),
       ("Band9", 3000, 4),
       ("Band8", 2000, 4);

-- employee data
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jimmy", "ZHANG", 1, 1),
        ("Amanda", "M.", 2, 1),
        ("Amy", "G.", 3, 1),
        ("Bobby", "T.", 4, 3),
        ("Cindy", "L.", 7, 1),
        ("Jennifer", "L.", 8, 5),
        ("Bill", "G.", 11, 2),
        ("Elen", "S.", 12, 7),
        ("Damian", "F.", 13, 7);