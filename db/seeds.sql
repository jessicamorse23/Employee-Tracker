INSERT INTO departmentTable (name)
VALUES ("Sales"), 
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roleTable (title, salary, departmentId)
VALUES ("Sales Lead", 100000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
("Lawyer", 190000, 4); 

INSERT INTO employeeTable (firstName, lastName, roleId, managerId)
VALUES ("Jessica", "Morse", 1, null),
("Rex", "Doodle", 3, null),
("Sally", "Smith", 2, 2),
("Lucy", "Berry", 4, 3),
INSERT INTO employeeTable (firstName, lastName, roleId, managerId)
VALUES ("Jessica", "Morse", 1, null),
("Rex", "Doodle", 3, null),
("Sally", "Smith", 2, 2),
("Lucy", "Berry", 4, 3),
("Daphne", "Reed", 4, 4);
