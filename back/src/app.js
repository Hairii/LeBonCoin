import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import './config/mongodb.js';
import './config/db.js';
import annoncesRoutes from './routes/annonces.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// route test
app.get('/api/test', (req, res) => {
    res.json({ message: 'serveur ok' });
});
app.use('/api/annonces', annoncesRoutes);

export default app;