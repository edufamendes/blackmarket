const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do banco de dados
const db = new sqlite3.Database('loja_facil.db');

// Criar tabela de usuários
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// Configurações do Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret: 'loja-facil-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));

// Middleware para verificar se usuário está logado
function verificarLogin(req, res, next) {
    if (req.session.usuario) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Rotas
app.get('/', (req, res) => {
    if (req.session.usuario) {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        res.sendFile(path.join(__dirname, 'welcome.html'));
    }
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'cadastro.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/perfil', verificarLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'perfil.html'));
});

// API para cadastro
app.post('/api/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    
    try {
        // Verificar se email já existe
        db.get('SELECT id FROM usuarios WHERE email = ?', [email], async (err, row) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro no banco de dados' });
            }
            
            if (row) {
                return res.status(400).json({ erro: 'Email já cadastrado' });
            }
            
            // Criptografar senha
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            
            // Inserir novo usuário
            db.run('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', 
                [nome, email, senhaCriptografada], function(err) {
                if (err) {
                    return res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
                }
                
                res.json({ sucesso: true, mensagem: 'Usuário cadastrado com sucesso!' });
            });
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// API para login
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    
    db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, usuario) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro no banco de dados' });
        }
        
        if (!usuario) {
            return res.status(400).json({ erro: 'Email ou senha incorretos' });
        }
        
        // Verificar senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        
        if (!senhaValida) {
            return res.status(400).json({ erro: 'Email ou senha incorretos' });
        }
        
        // Criar sessão
        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };
        
        res.json({ sucesso: true, mensagem: 'Login realizado com sucesso!' });
    });
});

// API para logout
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao fazer logout' });
        }
        res.json({ sucesso: true, mensagem: 'Logout realizado com sucesso!' });
    });
});

// API para verificar se usuário está logado
app.get('/api/usuario', (req, res) => {
    if (req.session.usuario) {
        res.json({ logado: true, usuario: req.session.usuario });
    } else {
        res.json({ logado: false });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
}); 