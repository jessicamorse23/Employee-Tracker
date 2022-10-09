const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const questions = [
  {
    type: "input",
    message: "Which employee are you updating? Please enter employee ID.",
    name: "updateEmployee",
  },

  {
    type: "input",
    message: "What role are you updating? Please enter the role ID.",
    name: "updateRole",
  },
];
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "employeeDb",
});
function updateEmployee() {
  inquirer
  .prompt(questions).then((response) => {
    db.query(`UPDATE employeeTable SET roleId = ${response.roleId} WHERE id = ${response.employeeTableId}`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query("SELECT * FROM employeeTable", (err, result) => {
          if (err) {
            console.log(err);
          }
          console.table(result);
        });
      }
    });
  });
}
 module.exports = updateEmployee