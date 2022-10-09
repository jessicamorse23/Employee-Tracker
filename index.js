const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employeeDb",
});

connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function to start questions
function start() {
  inquirer
    .prompt({
      type: "list",
      choices: ["Add a department", "Add a role", "Add an employee", "View Departments", "View Roles", "View Employees", "I'm Finished"],
      message: "What would you like to do?",
      name: "selection",
    })
    .then(function (task) {
      console.log(selection);
      switch (task.selection) {
        case "Add a department":
          addDept();
          break;
        case "Add a role":
          addRole();
        case "Add an employee":
          addEmployee();
          break;
        case "View Departments":
          viewDept();
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "I'm finshed":
          connection.end();
      }
    });
}

function addDept() {
  inquirer
    .prompt({
      type: "input",
      message: "Department name:",
      name: "deptName",
    })
    .then(function (answer) {
      connection.query("INSERT INTO departmentTable (name) VALUES (?)", [answer.deptName], function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Role title:",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "Role salary:",
        name: "roleSalary",
      },
      {
        type: "number",
        message: "Department ID:",
        name: "deptID",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO roleTable (title, salary, departmentId) VALUES (?, ?, ?)",
        [answer.roleTitle, answer.salaryTotal, answer.deptId],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Employee first name:",
        name: "firstName",
      },
      {
        type: "input",
        message: "Employee last name:",
        name: "lastName",
      },
      {
        type: "number",
        message: "Employee role ID:",
        name: "roleId",
      },
      {
        type: "number",
        message: "Enter Employee's Manager ID number:",
        name: "managerId",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employeeTable (firstName, lastName, roleId, managerId) VALUES (?, ?, ?, ?)",
        [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
}
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which empoyee are you updating?",
        name: "updateEmployee",
      },
      {
        type: "input",
        message: "What are you updating?",
        name: "updateRole",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employeeTable SET roleId=? WHERE firstName= ?",
        [answer.updateEmployee, answer.updateRole],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
}
function viewDept() {
  let query = "SELECT * FROM departmentTable";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
function viewRoles() {
  let query = "SELECT * FROM roleTable";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
function viewEmployees() {
  let query = "SELECT * FROM employeeTable";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function finish() {
  connection.end();
  process.exit();
}
