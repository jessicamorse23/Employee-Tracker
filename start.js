const inquirer = require("inquirer");
const cTable = require("console.table");
const addEmployee = require("./lib/employee");
const updateEmployee = require("./lib/updateEmployee");
const addRole = require("./lib/role");
const addDept = require("./lib/department");
const db = require("./db");
const question = [
  {
    type: "list",
    choices: ["Add a department", "Add a role", "Add an employee", "View Departments", "View Roles", "View Employees", "I'm Finished"],
    message: "What would you like to do?",
    name: "selection",
  },
];

function start() {
  inquirer.prompt(question).then((response) => {
    switch (response.option) {
      case "View Departments":
        db.query("SELECT * FROM departmentTable;", (err, result) => {
          if (err) {
            console.log(err);
          }
          console.table(result);
          start();
        });
        break;
      case "View roles":
        db.query("SELECT * FROM roleTable;", (err, result) => {
          if (err) {
            console.log(err);
          }
          console.table(result);
          start();
        });
        break;
      case "View employees":
        db.query(
          `
                  SELECT * FROM roleTable
                  JOIN employeeTable ON employeeTable.roleId=roleTable.id
                  JOIN departmentTable ON roleTable.departmentId=departmentTable.id
                  ORDER BY employeeTable.id;`,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            start();
          }
        );
        break;
      case "Add a department":
        addDept(start);
        break;
      case "Add a role":
        addRole(start);
        break;
      case "Add an employee":
        addEmployee(start);
        break;
      case "Update employee role":
        updateEmployee(start);
        break;
      default:
        finish();
    }
  });
}
module.exports = start;