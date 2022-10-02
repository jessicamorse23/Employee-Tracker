INSERT INTO department (name)
VALUES ("Sales"), 
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles (title, salary, departmentId)
VALUES ("Sales Lead", 100000, 1),
("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 1),
("Account Manager", 160000, 1),
("Accountant", 125000, 1),
("Lawyer", 190000, 1); 

INSERT INTO employeeTable (firstName, lastName, roleId, managerId)
VALUES ("Jessica", "Morse", 1, 2),
("Rex", "Doodle", 1, null),
("Sally", "Smith", 1, 2),
("Lucy", "Berry", 5, 8)