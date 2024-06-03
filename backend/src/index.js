import express from 'express';
import router from './router/router.js';
import { db } from './config/database.js';
import { Post, User } from './models/model.js';
import cookieParser from 'cookie-parser';


const app = express();

try {
    await db.authenticate();
    console.log('database connected');
} catch (error) {
    console.log('database error: ' + error);
}
// await User.sync();
// await Post.sync();
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.listen(4000);
console.info('listening on http://localhost:4000');