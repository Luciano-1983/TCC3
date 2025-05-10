const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Importando a configuração do banco de dados

// Enviar mensagem
router.post('/send', async (req, res) => {
    const { userId, professionalId, message } = req.body;
    try {
        const query = 'INSERT INTO mensagens (user_id, professional_id, message) VALUES ($1, $2, $3) RETURNING *';
        const values = [userId, professionalId, message];
        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
});

// Obter mensagens
router.get('/:userId/:professionalId', async (req, res) => {
    const { userId, professionalId } = req.params;
    try {
        const query = 'SELECT * FROM mensagens WHERE user_id = $1 AND professional_id = $2';
        const result = await db.query(query, [userId, professionalId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter mensagens' });
    }
});

module.exports = router;
