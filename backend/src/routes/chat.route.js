import {Router} from 'express';
import generateResponse from '../controllers/chat.controller.js';
const router = Router();

router.route('/').post(generateResponse);

export default router;