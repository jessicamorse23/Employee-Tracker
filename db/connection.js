const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
  //   port: 3306,
    user: "root",
    password: "rootroot",
    database: "employeeDb",
  });

  connection.connect(function (err) {
    if (err) throw err;
   });
   module.exports = connection;