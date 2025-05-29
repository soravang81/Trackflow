import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import orderRoutes from './routes/orders';
import locationRoutes from './routes/locationroute';
import auth from './routes/auth';

dotenv.config();

const app = express();
app.use(cors());1
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/orders', orderRoutes);
app.use('/api/location', locationRoutes);

export default app;
