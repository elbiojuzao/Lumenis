import { Router } from 'express';
import { createPreference } from '../services/MercadoPagoService';

const router = Router();

router.post('/create-preference', async (req, res) => {
  try {
    const { items } = req.body; // Receber itens do carrinho
    const preferenceId = await createPreference(
      items,
      'https://seusite.com/checkout/success',
      'https://seusite.com/checkout/error',
    );
    res.json({ id: preferenceId });
  } catch (error) {
    res.status(500).json({ error: 'Falha ao criar preferência' });
  }
});

export default router;