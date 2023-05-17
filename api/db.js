import mysql from "mysql"

export const db = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b98ef878cdd7e7",
    password: "94f44069",
    database: "heroku_a1b857cdb26bf18"
})
