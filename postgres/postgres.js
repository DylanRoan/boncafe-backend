require('dotenv').config()
const bcrypt = require("bcrypt")
const saltRounds = 8

const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false
  }
})

//query the database
async function queryDB (query, params = []) {
  let queryResult = await pool.query(query, params);
  return queryResult;
}

// ==================== SPECIFIC QUERIES ====================

//get main table
async function getMain () {
  let item = await queryDB(`SELECT * FROM main`)
  return item.rows
}

//authenticate
async function login (password, email) {
  let item = await queryDB("SELECT code, password FROM auth WHERE email = $1", [email.toLowerCase()])
  
  item = item.rows
  if (!Array.isArray(item) || !item.length) {
    return false
  }

  if (await bcrypt.compare(password, item[0].password)) return item[0].code
  else return false
}


//get table by code
async function getTable (code) {
  await queryDB(`CREATE TABLE IF NOT EXISTS ${code} (
    machine TEXT,
    serial TEXT,
    model TEXT,
    maintenance_due DATE
  );`)
  
  let item = await queryDB(`SELECT * FROM ${code}`)
  return item.rows
}

//check if user exists
async function userExists (email) {
  let result = await queryDB(`SELECT code FROM auth WHERE email = $1`, [email])
  return result.rows
}

//add user
async function addUser (code, email, password)
{
  let hash = await bcrypt.hash(password, saltRounds)
  await queryDB(`INSERT INTO auth (code, email, password) VALUES ($1, $2, $3)`, [code, email, hash])
}

module.exports = { 
  getMain,
  getTable,
  login,
  userExists,
  addUser
}