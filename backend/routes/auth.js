const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Certifique-se de que o caminho está correto

// Registro de usuário
router.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const user = await User.create({ nome, email, senha });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await User.authenticate(email, senha);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

module.exports = router;
