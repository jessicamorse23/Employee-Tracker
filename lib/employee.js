const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const questions = [
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
    ];
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user:'root',
            password:'rootroot',
            database:'employeeDb'
        })

      function addEmployee(callback) {
        inquirer
        .prompt(questions)
        .then(response=>{
            db.query(`"INSERT INTO employeeTable (firstName, lastName, roleId, managerId) VALUES ('${response.firstName}','${response.lastName}','${response.roleId}','${response.managerId}')`, (err, result)=>{
                if (err) {
                    console.log(err);
                }
                else{
                    db.query("SELECT * FROM employeeTable;", (err, result)=> {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result)
                        callback()
                    });
                }
        })
    })}

    module.exports = addEmployee;