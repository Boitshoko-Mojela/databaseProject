const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json({ limit: '1mb' }));
// <-- Important: to parse JSON POST body


// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bradlee91@',
    database: 'new_schema'
});

db.connect(err => {
    if (err) {
        console.error('DB connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL database');
});

// Products endpoint with base64 encoded webp images
app.get('/products', (req, res) => {
    const query = 'SELECT Product_ID, Product_Name, Product_Cost, Product_Picture FROM product';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            return res.status(500).send('Error fetching data');
        }

        const updated = results.map(row => {
            let base64 = '';
            if (row.Product_Picture) {
                base64 = `data:image/webp;base64,${Buffer.from(row.Product_Picture).toString('base64')}`;
            }
            return {
                Product_ID: row.Product_ID,
                Product_Name: row.Product_Name,
                Product_Cost: row.Product_Cost,
                Product_Picture: base64
            };
        });

        res.json(updated);
    });
});

// Customer endpoint (example: fetch customer with ID=1)
app.get('/customer', (req, res) => {
    const query = 'SELECT Customer_ID, Cus_Name, Cus_Email FROM customer'; // Adjust table and column names as needed
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching customer:', err.message);
            return res.status(500).send('Error fetching customer data');
        }
        if (results.length === 0) {
            return res.status(404).send('Customer not found');
        }
        res.json(results[0]);
    });
});
app.use(express.json()); // to parse JSON body

app.post('/order', (req, res) => {
    const cartItems = req.body.cart; // expect array of items with Product_ID and quantity
    const customerId = req.body.customerId || 1; // or get from auth/session; hardcoded 1 for demo

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty or invalid' });
    }

    // Insert each cart item into order_details (adjust as needed for your schema)
    const sql = 'INSERT INTO order_details (Customer_ID, Product_ID, Quantity) VALUES ?';
    const values = cartItems.map(item => [customerId, item.Product_ID, item.quantity]);

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting order details:', err);
            return res.status(500).json({ error: 'Database error inserting order details' });
        }
        res.json({ message: 'Order saved successfully', insertedRows: result.affectedRows });
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
