import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = new Router();

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/register', userController.register)
router.delete('/', userController.deleteAll)


export default router;
