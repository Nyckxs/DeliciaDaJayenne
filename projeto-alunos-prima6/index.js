// Importa o framework Express para criar o servidor web
const express = require('express');
// Importa o cliente do Prisma para conectar com o banco de dados
const { PrismaClient } = require('@prisma/client');

// Cria uma instância do Express (nosso servidor)
const app = express();
// Cria uma instância do Prisma (nosso banco de dados)
const prisma = new PrismaClient();

// Middlewares - funções que processam as requisições antes de chegar nas rotas
app.use(express.json()); // Permite receber dados no formato JSON
app.use(express.urlencoded({extended: true})); // Permite receber dados de formulários HTML
app.use(express.text()); // Permite receber texto puro

// Rota POST - Criar cliente
app.post('/confeitaria', async (requisicao, resposta) => {
    try {
        // Prisma.create() - insere um novo registro no banco de dados
        // requisicao.body contém os dados enviados pelo cliente
        const novoCliente = await prisma.cliente.create({
            data: {
                email: requisicao.body.email,    // Pega o email do corpo da requisição
                nome: requisicao.body.nome,      // Pega o nome do corpo da requisição
                rua: requisicao.body.rua, // Pega o endereço do corpo da requisição 
                cep: requisicao.body.cep, // Pega o cep do corpo da requisição
                numeroCasa: requisicao.body.numeroCasa, // Pega o número do corpo da requisição
                telefone: requisicao.body.telefone, // Pega o telefone do corpo da requisição 
                cpf: requisicao.body.cpf, // Pega o cpf do corpo da requisição  
                produto: requisicao.body.produto // Pega o produto do corpo da requisição
                
            }
        });
        
        // Envia resposta de sucesso com os dados do cliente criado
        resposta.json({
            message: "Cadastrado com sucesso",
            cliente: novoCliente
        });
    } catch (error) {
        // Se algo der errado, mostra o erro no console
        console.error(error);
        // Envia resposta de erro status 500 (erro interno do servidor)
        resposta.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
});

// Rota GET - Listar todos os clientes
app.get('/confeitaria', async (requisicao, resposta) => {
    try {
        // findMany() - busca TODOS os registros da tabela cliente
        const todosClientes = await prisma.cliente.findMany({
            select: {
                id: true,
                email: true,
                nome: true,
                rua: true,
                cep: true,
                numeroCasa: true,
                telefone: true,
                cpf: true,
                criadoEm: true,
                atualizadoEm: true
            }
        });
        // Envia a lista de clientes como resposta
        resposta.json(todosClientes);
    } catch (error) {
        console.error(error);
        resposta.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

// Rota GET - Buscar cliente por ID específico
// :id significa que é um parâmetro na URL (ex: /cliente/1, /cliente/2, etc.)
app.get('/confeitaria/:id', async (requisicao, resposta) => {
    try {
        // requisicao.params.id - pega o valor do :id na URL
        const id = parseInt(requisicao.params.id);
        
        // findUnique() - busca UM ÚNICO registro que corresponde ao filtro
        const clienteSelecionado = await prisma.cliente.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                nome: true,
                rua: true,
                cep: true,
                numeroCasa: true,
                telefone: true,
                cpf: true,
                criadoEm: true,
                atualizadoEm: true
            }
        });
        
        // Se não encontrar o cliente (retornou null)
        if (!clienteSelecionado) {
            // status(404) - "Não encontrado"
            return resposta.status(404).json({ error: 'Cliente não encontrado' });
        }
        
        // Se encontrou, envia os dados do cliente
        resposta.json(clienteSelecionado);
    } catch (error) {
        console.error(error);
        resposta.status(500).json({ error: 'Erro ao buscar cliente' });
    }
});

// Rota PUT - Atualizar cliente completo
app.put('/confeitaria/:id', async (requisicao, resposta) => {
    try {
        const id = parseInt(requisicao.params.id);
        
        // update() - atualiza um registro existente
        const clienteAtualizado = await prisma.cliente.update({
            where: { id }, // Encontra o cliente pelo id
            data: { // Dados que serão atualizados
                nome: requisicao.body.nome,
                email: requisicao.body.email,
                rua: requisicao.body.rua,
                cep: requisicao.body.cep,
                numeroCasa: requisicao.body.numeroCasa,
                telefone: requisicao.body.telefone,
                cpf: requisicao.body.cpf
            }
        });
        
        resposta.json({
            message: "Cliente atualizado com sucesso",
            cliente: clienteAtualizado
        });
    } catch (error) {
        console.error(error);
        // Código P2025 é erro do Prisma quando o registro não existe
        if (error.code === 'P2025') {
            return resposta.status(404).json({ error: 'Cliente não encontrado' });
        }
        resposta.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
});

// Rota DELETE - Deletar cliente
app.delete('/confeitaria/:id', async (requisicao, resposta) => {
    try {
        const id = parseInt(requisicao.params.id);
        
        // delete() - remove um registro do banco de dados
        await prisma.cliente.delete({
            where: { id } // Remove o cliente com este id específico
        });
        
        resposta.json({ message: "Cliente deletado com sucesso" });
    } catch (error) {
        console.error(error);
        // Se tentar deletar um cliente que não existe
        if (error.code === 'P2025') {
            return resposta.status(404).json({ error: 'Cliente não encontrado' });
        }
        resposta.status(500).json({ error: 'Erro ao deletar cliente' });
    }
});

// Função para fechar a conexão com o banco de dados de forma segura
const gracefulShutdown = async () => {
    // $disconnect() - método do Prisma para fechar a conexão com o banco
    await prisma.$disconnect();
    process.exit(0); // Encerra o processo com sucesso (código 0)
};

// Event listeners - capturam sinais de encerramento do sistema
// SIGINT: quando pressiona Ctrl+C no terminal
// SIGTERM: quando o sistema pede para o programa encerrar
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Inicia o servidor na porta 3000
// listen() - faz o servidor "ouvir" e aguardar requisições
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

