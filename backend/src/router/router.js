import express from 'express';
import { Home } from '../controllers/home.js';
import { login, logout, register, showUser } from '../controllers/user.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { token } from '../middleware/token.js';
import { create, show, update } from '../controllers/post.js';
import { upload } from '../utils/image.js';

const router = express.Router();

router.get('/', Home)


// USER
router.get('/users',verifyToken, showUser)
router.get('/token',token)
router.post('/register', register)
router.post('/login', login)
router.delete('/logout', logout)


// POST
router.post('/post/create',upload, create)
router.post('/post/update/:postId',upload, update)
router.get('/posts',show)



export default router;