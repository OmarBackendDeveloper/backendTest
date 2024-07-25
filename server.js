require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// Configura l'opzione strictQuery
mongoose.set('strictQuery', false);

// Connetti a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Definisci lo schema dell'utente
const userSchema = new mongoose.Schema({
    nome: String,
    cognome: String,
    telefono: String,
    email: { type: String, unique: true },
    corso: String
});

// Crea il modello dell'utente
const User = mongoose.model('User', userSchema);

// Middleware di autenticazione
const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied.');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};

// Endpoint per registrare o aggiornare un utente
app.post('/register', async (req, res) => {
    const { nome, cognome, telefono, email, corso } = req.body;

    // Verifica la bontà dei dati raccolti
    if (!nome || !cognome || !telefono || !email || !corso) {
        return res.status(400).send('All fields are required');
    }

    let user = await User.findOne({ email });
    if (user) {
        user.nome = nome;
        user.cognome = cognome;
        user.telefono = telefono;
        user.corso = corso;
        await user.save();
        return res.send('User updated');
    }
    user = new User({ nome, cognome, telefono, email, corso });
    await user.save();
    res.send('User registered');
});


// Endpoint per l'autenticazione e generazione del token
app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    if (username === 'testAimage' && password === 'testAimage') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

// Endpoint per il refresh del token
app.post('/refresh-token', (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const newToken = jwt.sign({ username: decoded.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token: newToken });
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
});

// Endpoint per ottenere i dati degli utenti
app.get('/data', authenticate, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Endpoint per esportare i dati degli utenti
app.get('/export', authenticate, async (req, res) => {
    const users = await User.find();
    res.json(users); // Esporta i dati in un formato che preferisci
});

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
