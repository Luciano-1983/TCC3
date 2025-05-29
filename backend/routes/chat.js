const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { body, validationResult } = require('express-validator');

// Validação das mensagens
const messageValidation = [
    body('userId').isInt().withMessage('userId deve ser um número inteiro'),
    body('professionalId').isInt().withMessage('professionalId deve ser um número inteiro'),
    body('message').isLength({ min: 1 }).withMessage('A mensagem não pode ser vazia'),
];

// Enviar mensagem
router.post('/send', messageValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, professionalId, message } = req.body;
    try {
        const query = 'INSERT INTO mensagens (user_id, professional_id, message) VALUES ($1, $2, $3) RETURNING *';
        const values = [userId, professionalId, message];
        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
});

// Obter mensagens
router.get('/:userId/:professionalId', async (req, res) => {
    const { userId, professionalId } = req.params;
    try {
        const query = 'SELECT * FROM mensagens WHERE user_id = $1 AND professional_id = $2';
        const result = await db.query(query, [userId, professionalId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Nenhuma mensagem encontrada' });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter mensagens' });
    }
});

module.exports = router;
