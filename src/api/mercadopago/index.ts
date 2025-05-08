import { Router } from 'express';
import { createPreference } from './createPreference';

const router = Router();

router.post('/create-mercado-pago-preference', createPreference);

export default router;