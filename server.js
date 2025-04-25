const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per il parsing del JSON
app.use(bodyParser.json());

// Creare un database SQLite nella directory del progetto
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Creare una tabella per le email (se non esiste)
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS emails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

// Regex per validare il formato dell'email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Endpoint per salvare un'email
app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Inserire l'email nel database
    const sql = `INSERT INTO emails (email) VALUES (?)`;
    db.run(sql, [email], function (err) {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                // Email già esistente
                return res.status(409).json({ message: 'Email already subscribed.' });
            }
            return res.status(500).json({ message: 'Database error.' });
        }

        // Successo
        res.status(200).json({ 
            message: 'Email saved successfully.', 
            email: email,   // Restituisci l'email come conferma
            id: this.lastID // Restituisci l'ID del record appena creato
        });
    });
});

// Endpoint per recuperare tutte le email
app.get('/emails', (req, res) => {
    const sql = `SELECT * FROM emails ORDER BY created_at DESC`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }

        res.status(200).json(rows);
    });
});

// Endpoint per verificare che il server sia attivo
app.get('/', (req, res) => {
    res.status(200).send('Server is running. Use /subscribe to POST emails or /emails to GET all emails.');
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});