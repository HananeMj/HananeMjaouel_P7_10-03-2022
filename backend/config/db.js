require("dotenv").config();
const { Client } = require("pg");
//const Pool = require("pg").Pool;

const client = new Client({
  host: "localhost",
  user: "hananemjaouel",
  password: "123456",
  port: 5432,
  database: "groupomania1",
});
/*if (!process.env.DB_USER) {
  throw new Error("process.env.DB_USER need configuration !");
}
if (!process.env.DB_PASS) {
  throw new Error("process.env.DB_PASS  need configuration !");
}
// créer connexion
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});*/

console.log("Successfully connected to groupomania DB !");

module.exports = client; //pool;
