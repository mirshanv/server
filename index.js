const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
const { executeQuery } = require('./db.config');

app.get('/api/items', async (req, res) => {
    try {
        const itemList = await executeQuery('SELECT * FROM Products');
        res.json(itemList);
    } catch (error) {
        console.error('Error fetching items from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post('/api/login', async (req, res) => {

    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const userQuery = 'SELECT * FROM Login WHERE username = ?';
        const user = await executeQuery(userQuery, [username]);

        if (user.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await executeQuery(userQuery, [password]);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
