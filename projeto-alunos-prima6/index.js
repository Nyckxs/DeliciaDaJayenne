require('dotenv').config();

const express          = require('express');
const cors             = require('cors');             // ← 1º: importa cors
const { PrismaClient } = require('@prisma/client');

const app    = express();
const prisma = new PrismaClient();

// ── Middlewares (ordem importa!) ─────────────────────────
app.use(cors({ origin: 'http://localhost:5173' }));   // ← 2º: libera o front ANTES das rotas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// ── POST /confeitaria – Registrar pedido ─────────────────
app.post('/confeitaria', async (req, res) => {
    try {
        const novoCliente = await prisma.cliente.create({
            data: {
                email:      req.body.email,
                nome:       req.body.nome,
                rua:        req.body.rua,
                cep:        req.body.cep,
                numeroCasa: Number(req.body.numeroCasa),
                telefone:   req.body.telefone,
                cpf:        req.body.cpf,
                produto:    req.body.produto,
            }
        });
        res.status(201).json({ message: 'Cadastrado com sucesso', cliente: novoCliente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
});

// ── GET /confeitaria – Listar todos ─────────────────────
app.get('/confeitaria', async (req, res) => {
    try {
        const todos = await prisma.cliente.findMany({
            select: {
                id: true, email: true, nome: true, rua: true,
                cep: true, numeroCasa: true, telefone: true,
                cpf: true, criadoEm: true, atualizadoEm: true
            }
        });
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

// ── GET /confeitaria/:id – Buscar por ID ─────────────────
app.get('/confeitaria/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const cliente = await prisma.cliente.findUnique({ where: { id } });
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
        res.json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
});

// ── PUT /confeitaria/:id – Atualizar ─────────────────────
app.put('/confeitaria/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const atualizado = await prisma.cliente.update({
            where: { id },
            data: {
                nome: req.body.nome, email: req.body.email,
                rua: req.body.rua, cep: req.body.cep,
                numeroCasa: Number(req.body.numeroCasa),
                telefone: req.body.telefone, cpf: req.body.cpf,
            }
        });
        res.json({ message: 'Cliente atualizado com sucesso', cliente: atualizado });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') return res.status(404).json({ error: 'Cliente não encontrado' });
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
});

// ── DELETE /confeitaria/:id – Deletar ────────────────────
app.delete('/confeitaria/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.cliente.delete({ where: { id } });
        res.json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') return res.status(404).json({ error: 'Cliente não encontrado' });
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
});

// ── Encerramento seguro ───────────────────────────────────
const gracefulShutdown = async () => {
    await prisma.$disconnect();
    process.exit(0);
};
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// ── Inicia servidor ───────────────────────────────────────
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));