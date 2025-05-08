import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Request, Response } from 'express';

interface MPPayer {
  id?: string;
  email?: string;
  identification?: {
    type: string;
    number: string;
  };
}

export const createPreference = async (req: Request, res: Response) => {
  try {
    const { items, userId, email, addressId } = req.body as {
      items: Array<{
        title: string;
        quantity: number;
        unit_price: number;
      }>;
      userId?: string;
      email?: string;
      addressId?: string;
    };

    const payer: MPPayer | undefined = userId ? {
      id: userId,
      ...(email && { email }),
      ...(userId.length > 11 && {
        identification: {
          type: userId.length === 11 ? 'CPF' : 'CNPJ',
          number: userId
        }
      })
    } : undefined;

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });

    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: items.map(item => ({
          id: `item-${Math.random().toString(36).substring(2, 11)}`,
          title: item.title.substring(0, 255),
          quantity: item.quantity,
          unit_price: parseFloat(item.unit_price.toFixed(2)),
          currency_id: 'BRL'
        })),
        payer,
        metadata: { addressId },
        back_urls: {
          success: `${process.env.FRONTEND_URL}/checkout/success`,
          failure: `${process.env.FRONTEND_URL}/checkout/error`
        },
        auto_return: 'approved'
      }
    });

    res.status(200).json({ preferenceId: response.id });

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao criar preferência' });
  }
};