import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

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

export default app;