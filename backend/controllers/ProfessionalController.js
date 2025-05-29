const Professional = require('../models/Professional');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Registrar um novo profissional
exports.register = async (req, res) => {
    const { nome, email, senha, telefone, cidade, especialidade, registro } = req.body;

    // Validação dos dados de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Verificar se o profissional já existe
        const existingProfessional = await Professional.findByEmail(email);
        if (existingProfessional) {
            return res.status(400).json({ error: 'Profissional já existe' });
        }

        // Criptografando a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criar novo profissional
        const professional = await Professional.create({ nome, email, senha: hashedPassword, telefone, cidade, especialidade, registro });
        res.status(201).json(professional);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar profissional' });
    }
};

// Login de profissional
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    // Validação dos dados de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const professional = await Professional.findByEmail(email);
        if (!professional) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Verificando a senha
        const isMatch = await bcrypt.compare(senha, professional.senha);
        if (isMatch) {
            res.status(200).json(professional);
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

// Buscar profissional por ID
exports.findById = async (req, res) => {
    const { id } = req.params;
    try {
        const professional = await Professional.findById(id);
        if (!professional) {
            return res.status(404).json({ error: 'Profissional não encontrado' });
        }
        res.status(200).json(professional);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar profissional' });
    }
};
