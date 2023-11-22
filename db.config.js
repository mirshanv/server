const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Shoppy-app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function executeQuery(query, values = []) {
    try {
        const [rows] = await pool.execute(query, values);
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

module.exports = { executeQuery };
