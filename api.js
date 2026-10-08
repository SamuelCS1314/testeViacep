import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

// 1. Obrigatório para processar o JSON recebido no POST
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.post('/api/uploads/enderecos', async (req, res) => {
    console.log('Dados recebidos do body: ', req.body);
    try {
        const { CEP, logradouro, bairro, localidade, uf, estado, regiao, ibge, gia, ddd, siafi } = req.body;

        // Nota: O ViaCEP envia "ddd" em minúsculo no JSON.
        const query = 'INSERT IGNORE INTO enderecos (CEP, logradouro, bairro, localidade, uf, estado, regiao, ibge, gia, DDD, siafi) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

        const [resultado] = await db.query(query, [CEP, logradouro, bairro, localidade, uf, estado, regiao, ibge, gia, ddd, siafi]);

        console.log("deu certo");
        // 2. Retorna uma resposta JSON válida para o cliente
        return res.status(201).json({ mensagem: "Endereço cadastrado com sucesso!" });

    } catch (error) {
        console.error("Erro no servidor:", error);
        // 3. Status 500 com resposta JSON apropriada
        return res.status(500).json({ erro: "Erro ao cadastrar endereço no banco de dados." });
    }
});

app.post('/api/uploads/usuarios', async (req, res) =>{
    try {
        const { CPF, nome, telefone, email, CEP, complemento, unidade } = req.body;

        const query = 'INSERT INTO usuarios (CPF, nome, telefone, email, CEP, complemento, unidade) VALUE (?,?,?,?,?,?,?)'
        const [resultado] = await db.query(query, [CPF, nome, telefone, email, CEP, complemento, unidade]);

        res.status(201).console.log("deu certo");
    } catch (error){
        console.log(error)
        console.log('Erro no server pai, vc é um fudido');
    }
})

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));