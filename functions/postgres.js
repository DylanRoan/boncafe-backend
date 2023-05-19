require('dotenv').config()
const bcrypt = require("bcrypt")
const saltRounds = 8 //may move to a more secure method later

const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: { rejectUnauthorized: false  }
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
  let item = await queryDB("SELECT code, password, confirmed, full_name FROM auth WHERE email = $1", [email.toLowerCase()])
  
  item = item.rows
  if (!Array.isArray(item) || !item.length) {
    return false
  }

  if (await bcrypt.compare(password, item[0].password)) return {code: item[0].code, "confirmed": item[0].confirmed, "name": item[0].full_name}
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
async function addUser (code, email, password, full_name)
{
  let hash = await bcrypt.hash(password, saltRounds)
  await queryDB(`INSERT INTO auth (code, email, password, full_name) VALUES ($1, $2, $3, $4)`, [code, email.toLowerCase(), hash, full_name])
}

//confirm email
async function confirmEmail (code)
{
  await queryDB(`UPDATE auth SET confirmed = TRUE WHERE code = $1`, [code])
}

//get company from maintenance date
async function getDate (date)
{
  let result = await queryDB(`SELECT * FROM main WHERE maintenance = $1`, [date])
  return result.rows
}

//get company from maintenance code
async function getCompanyFromCode (code)
{
  let result = await queryDB(`SELECT * FROM main WHERE code = $1`, [code])
  return result.rows
}

module.exports = { 
  queryDB,
  getMain,
  getTable,
  login,
  userExists,
  addUser,
  confirmEmail,
  getDate,
  getCompanyFromCode
}