import express from 'express';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';

const app = express();

app.use(express.json());
app.use(productRoutes);
app.use(userRoutes);
app.use(loginRoutes); 

export default app;
