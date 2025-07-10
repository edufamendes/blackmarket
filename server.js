const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve arquivos estáticos

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// Rota para criar pagamento
app.post('/api/criar-pagamento', async (req, res) => {
  try {
    const { items, payer } = req.body;

    // Validar dados recebidos
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: 'Lista de itens é obrigatória' 
      });
    }

    // Preparar itens para o Mercado Pago
    const preference = {
      items: items.map(item => ({
        title: item.nome,
        unit_price: parseFloat(item.preco),
        quantity: parseInt(item.quantidade)
      })),
      payer: {
        name: payer?.name || 'Cliente',
        email: payer?.email || 'cliente@exemplo.com'
      },
      back_urls: {
        success: `${req.protocol}://${req.get('host')}/sucesso.html`,
        failure: `${req.protocol}://${req.get('host')}/falha.html`,
        pending: `${req.protocol}://${req.get('host')}/pendente.html`
      },
      auto_return: 'approved',
      notification_url: `${req.protocol}://${req.get('host')}/api/webhook`,
      external_reference: `pedido_${Date.now()}`,
      expires: true,
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
    };

    // Criar preferência no Mercado Pago
    const response = await mercadopago.preferences.create(preference);

    res.json({
      success: true,
      init_point: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point,
      preference_id: response.body.id
    });

  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

// Webhook para receber notificações do Mercado Pago
app.post('/api/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentId = data.id;
      
      // Buscar informações do pagamento
      const payment = await mercadopago.payment.findById(paymentId);
      
      console.log('Pagamento recebido:', {
        id: payment.body.id,
        status: payment.body.status,
        status_detail: payment.body.status_detail,
        external_reference: payment.body.external_reference,
        amount: payment.body.transaction_amount
      });

      // Aqui você pode adicionar lógica para:
      // - Atualizar status do pedido no banco de dados
      // - Enviar email de confirmação
      // - Processar entrega dos itens
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ error: 'Erro no webhook' });
  }
});

// Rota para verificar status do pagamento
app.get('/api/pagamento/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await mercadopago.payment.findById(paymentId);
    
    res.json({
      id: payment.body.id,
      status: payment.body.status,
      status_detail: payment.body.status_detail,
      amount: payment.body.transaction_amount,
      external_reference: payment.body.external_reference
    });
  } catch (error) {
    console.error('Erro ao buscar pagamento:', error);
    res.status(500).json({ error: 'Erro ao buscar pagamento' });
  }
});

// Rota para obter configurações públicas
app.get('/api/config', (req, res) => {
  res.json({
    public_key: process.env.MERCADOPAGO_PUBLIC_KEY,
    environment: process.env.NODE_ENV
  });
});

// Rota para obter métodos de pagamento disponíveis
app.get('/api/metodos-pagamento', async (req, res) => {
  try {
    const response = await fetch('https://api.mercadopago.com/v1/payment_methods', {
      headers: {
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na API do Mercado Pago: ${response.status}`);
    }

    const metodos = await response.json();
    
    // Filtrar apenas métodos relevantes para Brasil
    const metodosBrasil = metodos.filter(metodo => 
      metodo.countries && metodo.countries.some(country => country.id === 'BR')
    );

    res.json({
      success: true,
      metodos: metodosBrasil,
      total: metodosBrasil.length
    });

  } catch (error) {
    console.error('Erro ao buscar métodos de pagamento:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar métodos de pagamento',
      details: error.message 
    });
  }
});

// Rota de teste
app.get('/api/teste', (req, res) => {
  res.json({ 
    message: 'API funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 API disponível em: http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend disponível em: http://localhost:${PORT}`);
});

module.exports = app; 