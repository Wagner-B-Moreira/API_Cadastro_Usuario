// Importa o framework Express para criar o servidor HTTP
const express = require('express');

// Cria uma instância do Express
const app = express(); 

// Define a porta em que o servidor vai rodar
const port = 3000;

// Middleware para permitir o uso de JSON no corpo das requisições (req.body)
app.use(express.json());

// Cria um array para armazenar os usuários cadastrados em memória
const usuario = [];

// Rota GET na raiz "/" para testar se a API está funcionando
app.get('/', (req, res) => {
  // Responde com uma mensagem simples
  res.send('API funcionando! Use POST /Cadastrar para cadastrar um usuário.');
});

// Rota POST para cadastrar novos usuários
app.post('/Cadastrar', (req, res) => {
    // Extrai os dados "nome" e "email" enviados no corpo da requisição
    const { nome, email } = req.body;

    // Verifica se nome ou email estão ausentes
    if (!nome || !email) {
        // Retorna um erro 400 (Bad Request) com uma mensagem
        return res.status(400).json({ Mensagem: "nome e email são obrigatórios" });
    }

    // Cria um novo usuário com ID automático (baseado no tamanho do array atual)
    const novoUsuario = { id: usuario.length + 1, nome, email };

    // Adiciona o novo usuário ao array de usuários
    usuario.push(novoUsuario);

    // Retorna o usuário criado com status 201 (Created)
    res.status(201).json(novoUsuario);
});

// Inicia o servidor e escuta a porta definida
app.listen(port, () => {
    // Mostra uma mensagem no console informando que o servidor está rodando
    console.log(`Servidor rodando na porta ${port}`);
});
