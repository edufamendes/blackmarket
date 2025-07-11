# 🚀 Loja Fácil - Arquivos para Hospedagem

## 📁 Arquivos Incluídos

### ✅ **Arquivos Essenciais:**
- `server.js` - Servidor principal
- `package.json` - Dependências do projeto
- `index.html` - Loja principal (protegida por login)
- `welcome.html` - Página de boas-vindas
- `cadastro.html` - Sistema de cadastro
- `login.html` - Sistema de login
- `perfil.html` - Perfil do usuário

### 🖼️ **Imagens dos Produtos:**
- Todas as imagens dos produtos (.png, .jpg, .webp, .JPG)
- Imagens de fundo e elementos visuais

### 📄 **Páginas de Retorno:**
- `sucesso.html` - Página de pagamento aprovado
- `falha.html` - Página de pagamento recusado
- `pendente.html` - Página de pagamento pendente
- `metodos-pagamento.html` - Informações de pagamento

## 🛠️ Como Fazer Deploy

### 1. **Hospedagem com Node.js (Recomendado):**
```bash
# 1. Faça upload de todos os arquivos
# 2. No terminal da hospedagem:
npm install
npm start
```

### 2. **Hospedagens que suportam Node.js:**
- **Heroku** (gratuito)
- **Railway** (gratuito)
- **Render** (gratuito)
- **Vercel** (gratuito)
- **Netlify** (gratuito)

### 3. **Configuração para Produção:**
```bash
# Adicione ao package.json:
"scripts": {
  "start": "node server.js",
  "build": "echo 'Build completed'"
}
```

## 🔧 Configurações Importantes

### **Porta do Servidor:**
O servidor usa a porta definida pela variável de ambiente `PORT` ou porta 3000 por padrão.

### **Banco de Dados:**
- SQLite é criado automaticamente
- Arquivo: `loja_facil.db` (criado na primeira execução)

### **WhatsApp:**
Edite o arquivo `index.html` e procure por:
```javascript
// Substitua este número pelo seu WhatsApp
window.open(`https://wa.me/5511999999999?text=${mensagemWhatsApp}`, '_blank');
```

## 📋 Checklist para Deploy

- [ ] Upload de todos os arquivos
- [ ] Instalação das dependências (`npm install`)
- [ ] Configuração do número do WhatsApp
- [ ] Teste do sistema de cadastro/login
- [ ] Teste do carrinho de compras
- [ ] Teste da finalização de pedidos

## 🎯 Funcionalidades do Sistema

### **Para Usuários:**
- ✅ Cadastro e login obrigatório
- ✅ Acesso aos produtos apenas quando logado
- ✅ Carrinho de compras dinâmico
- ✅ Finalização via WhatsApp
- ✅ Perfil do usuário

### **Para Vendedor:**
- ✅ Recebimento de pedidos no WhatsApp
- ✅ Dados completos do cliente
- ✅ Resumo detalhado do pedido
- ✅ Sistema de sessões seguras

## 🔒 Segurança

- ✅ Senhas criptografadas
- ✅ Sessões seguras
- ✅ Validação de dados
- ✅ Proteção contra SQL injection
- ✅ Acesso restrito aos produtos

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o Node.js está instalado na hospedagem
2. Confirme se todas as dependências foram instaladas
3. Verifique os logs do servidor
4. Teste o sistema localmente primeiro

---

**🎉 Sistema pronto para hospedagem!** 