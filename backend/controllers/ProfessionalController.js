const Professional = require('../models/Professional');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const db = require('../config/db');  // Certifique-se de importar o db para a consulta

// Função para criar um novo profissional
exports.createProfessional = async (req, res) => {
    const { nome, email, telefone, cidade, especialidade, registro } = req.body;  // Obtém os dados do corpo da requisição

    try {
        // Consulta SQL para inserir um novo profissional
        const query = `
            INSERT INTO profissionais (nome, email, telefone, cidade, especialidade, registro)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;  // Retorna o profissional inserido

        const values = [nome, email, telefone, cidade, especialidade, registro];  // Valores passados para a consulta
        const result = await db.query(query, values);  // Executa a consulta no banco de dados

        // Retorna o profissional criado com status 201
        res.status(201).json(result.rows[0]);  // Envia a resposta com status 201 e o profissional criado
    } catch (error) {
        console.error(error);
        // Caso ocorra um erro, retorna um erro 500
        res.status(500).json({ error: 'Erro ao criar o profissional' });
    }
};

// Função de login de profissional
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

// Função para obter um profissional pelo ID
exports.getProfessionalById = async (req, res) => {
    const { id } = req.params;  // Obtém o ID a partir dos parâmetros da URL

    try {
        const professional = await Professional.findById(id);

        if (!professional) {
            return res.status(404).json({ error: 'Profissional não encontrado' });
        }

        res.status(200).json(professional);  // Retorna o profissional encontrado
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o profissional' });
    }
};

// Função para obter todos os profissionais
exports.getAllProfessionals = async (_req, res) => {
    try {
        const professionals = await Professional.findAll();

        if (!professionals || professionals.length === 0) {
            return res.status(404).json({ message: 'Nenhum profissional encontrado' });
        }

        res.status(200).json(professionals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os profissionais' });
    }
};

// Função para atualizar um profissional
exports.updateProfessional = async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, cidade, especialidade, registro } = req.body;

    try {
        const query = `
            UPDATE profissionais
            SET nome = $1, email = $2, telefone = $3, cidade = $4, especialidade = $5, registro = $6
            WHERE id = $7
            RETURNING *`;

        const values = [nome, email, telefone, cidade, especialidade, registro, id];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Profissional não encontrado' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o profissional' });
    }
};

// Função para deletar um profissional
exports.deleteProfessional = async (req, res) => {
    const { id } = req.params;

    try {
        const professional = await Professional.findById(id);

        if (!professional) {
            return res.status(404).json({ error: 'Profissional não encontrado' });
        }

        // Chama a função delete do modelo Professional
        const isDeleted = await Professional.delete(id);

        if (isDeleted) {
            return res.status(204).send();  // Retorna status 204 sem conteúdo
        } else {
            return res.status(500).json({ error: 'Erro ao deletar profissional' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar profissional' });
    }
};

