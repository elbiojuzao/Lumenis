import mercadopago from 'mercadopago';

// Configure MercadoPago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

export interface CreatePreferenceInput {
  items: Array<{
    title: string;
    unit_price: number;
    quantity: number;
  }>;
  payer: {
    email: string;
    name?: string;
  };
  external_reference: string;
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
}

export const createPaymentPreference = async (input: CreatePreferenceInput) => {
  try {
    const preference = await mercadopago.preferences.create({
      items: input.items,
      payer: input.payer,
      external_reference: input.external_reference,
      back_urls: input.back_urls,
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [
          { id: 'ticket' }
        ],
        installments: 12
      }
    });

    return preference;
  } catch (error) {
    console.error('Error creating MercadoPago preference:', error);
    throw error;
  }
};

export const getPaymentStatus = async (paymentId: string) => {
  try {
    const payment = await mercadopago.payment.get(paymentId);
    return payment;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};