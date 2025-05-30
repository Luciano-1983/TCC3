const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const ProfessionalController = require('../controllers/ProfessionalController');
const { body } = require('express-validator');

// Registro de usuário
router.post('/register', 
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
    UserController.register
);

// Login de usuário
router.post('/login', UserController.login);

// Rota POST para criar um novo profissional
router.post('/professionals', ProfessionalController.createProfessional);  // Função chamada corretamente

// Rota POST para login de profissional
router.post('/professional/login', ProfessionalController.login);  // Função chamada corretamente

// Obter informações do profissional
router.get('/professional/:id', async (req, res) => {
    const professionalId = req.params.id;
    try {
        const professional = await ProfessionalController.getProfessionalById(professionalId);
        if (!professional) {
            return res.status(404).json({ error: 'Profissional não encontrado' });
        }
        res.status(200).json(professional);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter profissional' });
    }
});

// Obter informações de todos profissionais
router.get('/professionals', ProfessionalController.getAllProfessionals);

// Atualizar dados de um profissional
router.put('/professionals/:id', ProfessionalController.updateProfessional);

// Rota para deletar um profissional
router.delete('/professional/:id', ProfessionalController.deleteProfessional);

module.exports = router;
