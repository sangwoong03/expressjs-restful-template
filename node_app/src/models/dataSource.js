const { DataSource } = require("typeorm");

const dataSource = new DataSource({
  type: process.env.CONNECTION,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = { dataSource };