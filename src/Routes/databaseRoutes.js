import { Router } from 'express';

import DatabaseController from '../controllers/DatabaseController.js';
import TokenMiddleawre from '../middlewares/tokenMiddleware.js'

const router = new Router();

router.post('/register', DatabaseController.register);
router.post('/login', DatabaseController.login);
router.put('/', TokenMiddleawre ,DatabaseController.update);

export default router;
