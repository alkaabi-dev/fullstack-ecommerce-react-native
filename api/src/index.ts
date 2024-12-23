import express, { json, urlencoded } from 'express';
import serverless from 'serverless-http';

import productsRouter from './routes/products/index.js';
import ordersRouter from './routes/orders/index.js';
import authRoutes from './routes/auth/index.js';

const port = 3000;

const app = express();

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/products', productsRouter);
app.use('/auth', authRoutes);
app.use('/orders', ordersRouter);

if (process.env.NODE_ENV === 'dev') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

serverless;
export const handler = serverless(app);
