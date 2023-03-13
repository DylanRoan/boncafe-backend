require('dotenv').config()

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
  let item = await queryDB("SELECT code FROM auth WHERE password = $1 AND email = $2", [password, email])
  //let item = await queryDB(`SELECT code FROM auth WHERE password = '${password}' AND email = '${email}'`) //keeping to show others later
  return item.rows
}

//get table by code
async function getTable (code) {
  await queryDB(`CREATE TABLE IF NOT EXISTS ${code} `)
  let item = await queryDB(`SELECT * FROM ${code}`)
  return item.rows
}

module.exports = { 
  getTable,
  login,

}