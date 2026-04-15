import {Router} from 'express';
import generateResponse from '../controllers/chat.controller.js';
import authMiddleware from '../controllers/authMiddleware.js';

const router = Router();

router.route('/').post(authMiddleware,generateResponse);

export default router;