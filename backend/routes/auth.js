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

// Registro de profissional
router.post('/professional/register', 
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
    ProfessionalController.register
);

// Login de profissional
router.post('/professional/login', ProfessionalController.login);

module.exports = router;
