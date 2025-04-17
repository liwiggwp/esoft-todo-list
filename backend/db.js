const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "esoft_test",
  password: "123456789",
});

module.exports = connection;