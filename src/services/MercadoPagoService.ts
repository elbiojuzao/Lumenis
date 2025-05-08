import MercadoPagoConfig, { Preference } from 'mercadopago';

const mp = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

export async function createPreference(items: Array<{
  title: string;
  quantity: number;
  unit_price: number;
}>, successUrl: string, failureUrl: string) {
  const preference = new Preference(mp)
  const result = await preference.create({
    body: {
      items: items.map((item: any) => ({
        id: item._id,
        title: item.nome,
        quantity: item.quantidade,
        unit_price: Number(item.valor),
        currency_id: 'BRL',
      })),
      auto_return: 'approved',
      back_urls: {
        success: successUrl,
        failure: failureUrl,
      },
      
    },
  });
  return result.id;
}