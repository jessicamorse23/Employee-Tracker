DROP DATABASE IF EXISTS employeeDb;
CREATE DATABASE employeeDb;

USE employeeDb;

CREATE TABLE departmentTable (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roleTable (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL, 
    departmentId INT, 
    FOREIGN KEY(departmentId)
    REFERENCES departmentTable(id)
    ON DELETE SET NULL
);

CREATE TABLE employeeTable (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT, 
    FOREIGN KEY(roleId)
    REFERENCES roleTable(id)
    -- ON DELETE SET NULL,
    managerId INT,
    FOREIGN KEY(managerId)
    REFERENCES employeeTable(id)
);