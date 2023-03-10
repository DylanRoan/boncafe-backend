require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false
  }
})

async function queryDB (query) {
  let queryResult = await pool.query(query, []);
  return queryResult;
}

//get entire table
async function getTable (table) {
  let item = await queryDB(`SELECT * FROM ${table}`)
  return item.rows
}

//get specific item
async function findInMain (code) {
  let item = await queryDB(`SELECT * FROM main WHERE code = '${code}'`)
  return item.rows
}

//create table if doesnt exist
async function createClient (code) {
  let item = await queryDB(`CREATE TABLE IF NOT EXISTS ${code} (machine VARCHAR(255), serial VARCHAR(255), model VARCHAR(255), maintenance_due VARCHAR(255))`)
  console.log(`Creating table if doesn't exist: ${code}`)
  return item.rows
}

async function validLogin (pass, email) {
  let item = await queryDB(`SELECT * FROM main WHERE password = '${pass}' AND name = '${email}'`)
  item = item.rows
  if (item == undefined || item.length == 0)
    return false
  return item[0].code
}


module.exports = { 
  getTable,
  findInMain,
  createClient,
  validLogin
}