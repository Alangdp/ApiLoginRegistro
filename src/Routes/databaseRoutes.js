import { Router } from 'express';

import DatabaseController from '../controllers/DatabaseController.js';

const router = new Router();

router.post('/', DatabaseController.register);
router.post('/login', DatabaseController.login);


export default router;
