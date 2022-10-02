const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });
// database file (DB)
// front end folder
//  back end folder


// create the commands required to view the table
// create the database with the tables with the expected properties that each table needs
// seed the data with the seeds.sql file
// work on the prompts for adding to the table
// file with helper functions

connection.execute(
    'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    [],
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
  
      // If you execute same statement again, it will be picked from a LRU cache
      // which will save query preparation time and give better performance
    }
  );

