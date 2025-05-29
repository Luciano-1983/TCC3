const express = require('express');
const cors = require('cors');
const path = require('path');

// Criando o app Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Habilita CORS para permitir requisições de diferentes origens
app.use(express.json());  // Permite a leitura de requisições com body JSON

// Roteamento das APIs
// Aqui estamos usando as rotas de auth e chat
app.use('/api/auth', require('./routes/auth'));  // Roteador de autenticação (registro e login)
app.use('/api/chat', require('./routes/chat'));  // Roteador de chat (envio e recuperação de mensagens)

// Serve os arquivos estáticos do frontend
const frontendPath = path.join(__dirname, '..', 'frontend');  // Caminho do diretório frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));  // Serve o frontend como arquivos estáticos

// Rota padrão para enviar o arquivo index.html do frontend
app.get('/', (_req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Fallback para SPA (Single Page Application)
// Isso garante que qualquer rota não encontrada no backend vá para o frontend para lidar com as rotas de SPA
app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
