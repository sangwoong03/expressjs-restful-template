require("dotenv").config();

const { DataSource } = require("typeorm");

const database = new DataSource({
  type     : process.env.CONNECTION,
  host     : process.env.HOST,
  port     : process.env.DB_PORT,
  username : process.env.USERNAME,
  password : process.env.PASSWORD,
  database : process.env.DATABASE,
});

module.exports = { database }