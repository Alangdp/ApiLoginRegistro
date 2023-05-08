import { Router } from 'express';
import registerController from '../controllers/registerController.js';

const router = new Router();

router.get('/teste', registerController.index);

export default router;
