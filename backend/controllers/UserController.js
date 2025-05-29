const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Registrar um novo usuário
exports.register = async (req, res) => {
    const { nome, email, senha } = req.body;

    // Validação dos dados de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Verificar se o usuário já existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        // Criptografando a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criar novo usuário
        const user = await User.create({ nome, email, senha: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

// Login de usuário
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    // Validação dos dados de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Verificando a senha
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (isMatch) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};
