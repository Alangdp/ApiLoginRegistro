import { Router } from 'express';
import userController from '../controllers/userController.js';

import loginInDB from '../middlewares/databaseMiddleware.js'

const router = new Router();

router.get('/', loginInDB ,userController.index);
router.get('/:id', loginInDB, userController.show);
router.post('/register', loginInDB, userController.register)
router.delete('/:id', loginInDB, userController.delete)
router.put('/:id', loginInDB, userController.update)
router.post('/', userController.login)


export default router;
