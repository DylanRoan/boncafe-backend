const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false
  }
})

const getTable = (request, response) => {
    pool.query('SELECT * FROM main', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}




//add client
//


  module.exports = { getTable }
