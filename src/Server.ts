import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mercadoPagoRouter from './api/mercadopago';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', mercadoPagoRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'API Online 🚀' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});