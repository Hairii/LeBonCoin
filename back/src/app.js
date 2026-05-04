import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import './config/mongodb.js';
import './config/db.js';
import annoncesRoutes from './routes/annonces.routes.js';
import messageRoutes from './routes/message.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, '../../front')));

app.get('/api/test', (req, res) => {
    res.json({ message: 'serveur ok' });
});
app.use('/api/annonces', annoncesRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

export default app;