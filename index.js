const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "employeeDb",
  },
  console.log("connected")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // https://www.tabnine.com/code/javascript/functions/mysql/Connection/threadId?snippet=5f64b8e6f93c3aaf60e0df20 - source for connection code
// connection.connect(function (err) {
//   if (err) throw err;
//   //  console.error('error connecting: ' + err.stack);
//   //  return;
//   console.log("connected as id " + connection.threadId);
//   start();
// });

// // questions for user
(start) => {
  inquirer
    .createPromptModule({
      type: "list",
      choices: ["Add a department", "Add a role", "Add an employee", "View Departments", "View Roles", "View Employees", "I'm Finished"],
      message: "What would you like to do?",
      name: "selection",
    })
    .then((option) => {
      console.log(option);
      switch (option.selection) {
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
        default:
          finish();
      }
    });
};

(addDept) => {
  inquirer
    .prompt({
      type: "input",
      message: "Department name:",
      name: "deptName",
    })

    .then(function (response) {
      connection.query("INSERT INTO departmentTable (name) VALUES (?)", [response.deptName], function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
};

(addEmployee) => {
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
    .then(function (response) {
      connection.query(
        "INSERT INTO roleTable (title, salary, departmentId) VALUES (?, ?, ?)",
        [response.roleTitle, response.salaryTotal, response.deptId],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};

(addEmployee) =>
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
    .then(function (response) {
      connection.query(
        "INSERT INTO employeeTable (firstName, lastName, roleId, managerId) VALUES (?, ?, ?, ?)",
        [response.firstName, response.lastName, response.roleId, response.managerId],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });

(updateEmployee) => {
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
};

(viewDept) => {
  let query = "SELECT * FROM departmentTable";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

(viewRoles) => {
  let query = "SELECT * FROM roleTable";
  connection.query(query, function(err, res) {
    if (err) throw err; 
    console.table(res);
    start();
  });
}

(viewEmployee) => {
  let query = "SELECT * FROM employeeTable";
  connection.query(query, function(err, res) {
    if (err) throw err; 
    console.table(res);
    start();
  });
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

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
