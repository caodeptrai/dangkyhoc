require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected successfully');
    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API Health: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to connect to MySQL:', error.message);
    console.error('Make sure XAMPP MySQL is running and the database exists.');
    process.exit(1);
  }
}

startServer();
