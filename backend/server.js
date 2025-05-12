const express = require('express');
const app = express();
const port = 3000;
const db = require('./database');

app.use(express.json());
app.use(express.static('../frontend'));

app.get('/api/status', (req, res) => {
    res.json({ message: 'Servidor está rodando!' });
});

app.post('/api/usuarios', (req, res) => {
    const { nome } = req.body;
    db.run('INSERT INTO usuarios (nome, progresso) VALUES (?, ?)', [nome, 'iniciante'], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, nome, progresso: 'iniciante' });
    });
});

app.get('/api/usuarios', (req, res) => {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
