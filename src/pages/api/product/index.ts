import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Product from '../../../models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
