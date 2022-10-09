const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
  }} 

  module.exports = new DB(connection);

//   I had help with this code from Tucker Larrabee at askBCS