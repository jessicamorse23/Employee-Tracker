// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3001;
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const db = require(".");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employeeDb",
})
// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     user: "root",
//     password: "rootroot",
//     database: "employeeDb",
//   },
//   console.log("connected")
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// https://www.tabnine.com/code/javascript/functions/mysql/Connection/threadId?snippet=5f64b8e6f93c3aaf60e0df20 - source for connection code
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
  start();
});

// // questions for user

const question = [
  {
    type: "list",
      choices: ["Add a department", "Add a role", "Add an employee", "View Departments", "View Roles", "View Employees", "I'm Finished"],
      message: "What would you like to do?",
      name: "selection",
  }
]

function start() {
  inquirer
    .prompt(question) 
    .then(response => {
      switch (response.option) {
        case "View Departments":
         db.query("SELECT * FROM department;", (err, result)=> {
          if (err) {
            console.log(err);
          } console.table(result)
         });
        case "Add a department":
          addDept();
          break;
        case "Add a role":
          addRole();
        case "Add an employee":
          addEmployee();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
          case "Update employee role":
            updateEmployee();
            break;
        default:
          finish();
      }
    });
};
module.exports = start

function addDept() {
  inquirer
    .prompt({
      type: "input",
      message: "Department name:",
      name: "deptName",
    }).then(function(answer) {
      connection.query("INSERT INTO departmentTable (name) VALUES (?)", [answer.deptName], function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
};

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
    ]).then(function(answer) {
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
};



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
    ]).then(function(answer) {
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
};

function viewDept() {
  let query = "SELECT * FROM departmentTable";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

function viewRoles() {
  let query = "SELECT * FROM roleTable";
  connection.query(query, function(err, res) {
    if (err) throw err; 
    console.table(res);
    start();
  });
}

function viewEmployees() {
  let query = "SELECT * FROM employeeTable";
  connection.query(query, function(err, res) {
    if (err) throw err; 
    console.table(res);
    start();
  });
};

function finish() {
  connection.end();
  process.exit();
}

// (finish) => {
//   connection.end();
//   process.exit();
// }
// database file (DB)
// front end folder
//  back end folder

// create the commands required to view the table
// create the database with the tables with the expected properties that each table needs
// seed the data with the seeds.sql file
// work on the prompts for adding to the table
// file with helper functions

// connection.execute("SELECT * FROM `table` WHERE `name` = ? AND `age` > ?", [], function (err, results, fields) {
//   console.log(results); // results contains rows returned by server
//   console.log(fields); // fields contains extra meta data about results, if available

// If you execute same statement again, it will be picked from a LRU cache
// which will save query preparation time and give better performance

// app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
