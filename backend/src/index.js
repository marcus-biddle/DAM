import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import assetRouter from './routes/assetsRoute.js'
// import path from 'path';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
// app.use('/upload', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/assets', assetRouter);

// app.get('/api/upload', (req, res) => { res.send('Hello WOrld')})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));