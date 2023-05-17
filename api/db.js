import mysql from "mysql";

export const db = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-east-06.cleardb.net",
  user: "b98ef878cdd7e7",
  password: "94f44069",
  database: "heroku_a1b857cdb26bf18"
});

// Event listener for connection errors
db.on("error", (err) => {
  console.error("Database connection error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    handleDisconnect();
  } else {
    throw err;
  }
});

// Function to handle reconnection
function handleDisconnect() {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error reconnecting to the database:", err);
      setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
    } else {
      console.log("Reconnected to the database!");
      db.releaseConnection(connection); // Release the previous connection
    }
  });
}

// Initial connection
db.getConnection((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

export default db;
