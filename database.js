const express = require('express');
const mysql = require('mysql');

// Create an Express application
const app = express();

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user:"root",
  password: "123456",
  database: "sample"
});

// Define a route to retrieve data from the database
app.get('/', (req, res) => {
  // Retrieve data from the database
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).send('Error connecting to database');
      return;
    }

    // Perform a query
    connection.query('SELECT * FROM menu', (error, results, fields) => {
      // Release the connection
      connection.release();

      if (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Error executing query');
        return;
      }

      // Send the results as a response
      res.json(results);
    });
  });
});

// Start the Express server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
