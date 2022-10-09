const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const questions = [
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
 ];

 const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'rootroot',
        database:'employeeDb'
    })

    function addRole(callback) {
        inquirer
        .prompt(questions)
        .then(response=>{
            db.query(`"INSERT INTO roleTable (title, salary, departmentId) VALUES ('${response.title}','${response.salary}','${response.departmentId}')`, (err, result)=>{
                if (err) {
                    console.log(err);
                }
                else{
                    db.query("SELECT * FROM roleTable;", (err, result)=> {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result)
                        callback()
                    });
                }
        })
    })}

    module.exports = addRole;