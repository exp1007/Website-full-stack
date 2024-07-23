const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:mysecretpassword@localhost:5432')
// Fromat: const db = pgp('postgres://username:password@host:port/database')

// Exporting DB so you can import the connection object
module.exports = db
