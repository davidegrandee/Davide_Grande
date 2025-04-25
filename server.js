const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Regex per validare l'email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Configura il rate limiter per prevenire abusi
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuti
    max: 100, // Limita ogni IP a 100 richieste per finestra
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Configura il middleware CORS
app.use(cors({
    origin: 'https://davidegrandee.github.io/Davide_Grande/', // URL del tuo frontend
    methods: ['POST', 'GET'], // Consenti i metodi POST e GET
}));

// Middleware per il parsing del JSON
app.use(bodyParser.json());

// Percorso per la cartella delle email
const emailsDir = path.join(__dirname, 'emails');

// Creazione della cartella se non esiste
if (!fs.existsSync(emailsDir)) {
    fs.mkdirSync(emailsDir);
}

// API per salvare un'email
app.post('/subscribe', (req, res) => {
    const email = req.body.email; // Ottieni l'email dal corpo della richiesta

    // Verifica che l'email sia stata fornita
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    // Validazione dell'email
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Nome del file basato sull'email (sostituendo caratteri non validi con "_")
    const fileName = email.replace(/[^a-zA-Z0-9]/g, '_') + '.txt';
    const filePath = path.join(emailsDir, fileName);

    // Verifica se l'email è già stata salvata
    if (fs.existsSync(filePath)) {
        return res.status(409).json({ message: 'Email already subscribed.' });
    }

    // Salva l'email nel file
    fs.writeFileSync(filePath, `Email: ${email}`, 'utf-8');

    // Risposta di successo
    res.status(200).json({ message: 'Email saved successfully.' });
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});