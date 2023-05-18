import { Router } from 'express';

import DatabaseController from '../controllers/DatabaseController.js';

const router = new Router();

router.post('/register', DatabaseController.register);
router.post('/login', DatabaseController.login);
router.put('/', DatabaseController.update);

export default router;
