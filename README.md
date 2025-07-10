# 🛒 Loja Fácil - API Mercado Pago

Sistema completo de e-commerce com integração ao Mercado Pago.

## 🚀 Funcionalidades

- ✅ Carrinho de compras dinâmico
- ✅ Integração completa com Mercado Pago
- ✅ Páginas de retorno personalizadas
- ✅ Webhook para notificações
- ✅ Verificação de status de pagamento
- ✅ Interface responsiva e moderna

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- Conta no Mercado Pago
- Credenciais de API do Mercado Pago

## ⚙️ Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Credenciais do Mercado Pago

Edite o arquivo `config.env` e adicione suas credenciais:

```env
# Credenciais do Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=SEU_ACCESS_TOKEN_AQUI
MERCADOPAGO_PUBLIC_KEY=SEU_PUBLIC_KEY_AQUI

# Configurações do servidor
PORT=3000
NODE_ENV=development
```

### 3. Obter Credenciais do Mercado Pago

1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
2. Faça login na sua conta
3. Vá em "Suas integrações"
4. Copie o **Access Token** e **Public Key**

### 4. Configurar Webhook (Opcional)

Para receber notificações automáticas:

1. No painel do Mercado Pago, vá em "Configurações"
2. Adicione a URL do webhook: `https://seudominio.com/api/webhook`

## 🚀 Como Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

O servidor estará disponível em: `http://localhost:3000`

## 📱 Endpoints da API

### Criar Pagamento
```
POST /api/criar-pagamento
```

**Body:**
```json
{
  "items": [
    {
      "nome": "Produto",
      "preco": 49.00,
      "quantidade": 1
    }
  ],
  "payer": {
    "name": "Nome do Cliente",
    "email": "cliente@email.com"
  }
}
```

### Verificar Status do Pagamento
```
GET /api/pagamento/:id
```

### Configurações
```
GET /api/config
```

### Teste da API
```
GET /api/teste
```

### Métodos de Pagamento
```
GET /api/metodos-pagamento
```

## 🎨 Personalização

### Alterar WhatsApp
Edite os arquivos `sucesso.html`, `falha.html` e `pendente.html` e substitua:
```
https://wa.me/SEU_NUMERO_WHATSAPP
```

### Alterar Cores
Edite o CSS nos arquivos HTML para personalizar as cores da sua marca.

## 🔧 Estrutura do Projeto

```
meu site/
├── index.html              # Página principal da loja
├── sucesso.html            # Página de pagamento aprovado
├── falha.html              # Página de pagamento recusado
├── pendente.html           # Página de pagamento pendente
├── metodos-pagamento.html  # Página de métodos de pagamento
├── server.js               # Servidor da API
├── package.json            # Dependências do projeto
├── config.env              # Configurações (credenciais)
└── README.md               # Este arquivo
```

## 🛡️ Segurança

- ✅ Credenciais armazenadas em variáveis de ambiente
- ✅ Validação de dados de entrada
- ✅ Tratamento de erros
- ✅ CORS configurado

## 📞 Suporte

Para dúvidas ou problemas:
- WhatsApp: [Seu número]
- Email: [Seu email]

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ para sua loja online!** 