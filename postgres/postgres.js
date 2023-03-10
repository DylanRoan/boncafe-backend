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

const getTable = (request, response) => {
    pool.query('SELECT * FROM main', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

async function validLogin (pass, email) {
  let item = await queryDB(`SELECT * FROM main WHERE password = '${pass}' AND name = '${email}'`)
  item = item.rows
  console.log(pass +" " + email)
  console.log(item)
  if (item == undefined || item.length == 0)
    return false
  return item[0].code
}


module.exports = { 
  getTable,
  validLogin
}