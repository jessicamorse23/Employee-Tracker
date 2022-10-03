const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const db = mysql.createConnection(
  {
    host: "localhost",
    port: 3301,
    user: "root",
    password: "rootroot",
    database: "employeeDb",
  },
  console.log("connected")
);


// questions for user 
const question = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: ["View departments", "View roles", "View employees", "Add department", "Add role", "Add employee"],
    name: "choice",
  },
];

function init() {
  inquirer.prompt(question).then((response) => {
    switch (response.choice) {
      case "View departments":
        break;
      case "View roles":
        break;
      case "View employees":
        break;
      case "Add department":
        break;
      case "Add employee":
        break;
      case "Add role":
        break;
    }
  });
}


// database file (DB)
// front end folder
//  back end folder

// create the commands required to view the table
// create the database with the tables with the expected properties that each table needs
// seed the data with the seeds.sql file
// work on the prompts for adding to the table
// file with helper functions

connection.execute("SELECT * FROM `table` WHERE `name` = ? AND `age` > ?", [], function (err, results, fields) {
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available

  // If you execute same statement again, it will be picked from a LRU cache
  // which will save query preparation time and give better performance
});
