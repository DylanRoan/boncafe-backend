const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: 'postgres://abxfrrosschvob:45123b42deee56c5cf850a1866287e1e065692609608d949de791163ead7be3b@ec2-52-215-68-14.eu-west-1.compute.amazonaws.com:5432/daucvv5hb027bf',
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
