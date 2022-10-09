const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = mysql.createConnection({
    host: "localhost",
    // port: 3306,
    user: "root",
    password: "rootroot",
    database: "employeeDb",
  });

  function addDept(callback){
    inquirer.prompt({
        type: 'input',
        message:'Enter name of new department',
        name:'newDepartment'
    })
    .then(response=>{
        db.query(`INSERT INTO departmentTable (name) VALUES ('${response.newDepartment}')`, (err, result)=>{
            if (err) {
                console.log(err);
            }

            else{
                db.query('SELECT * FROM departmentTable;', (err, result)=> {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result)
                    callback()
                });
            }
        })

    })}

    


module.exports = addDept;