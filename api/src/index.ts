import express, { json, urlencoded } from 'express';
import productsRouter from './routes/products/index.js';
import authRoutes from './routes/auth/index.js';
import serverless from 'serverless-http';

const port = 3000;

const app = express();

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/products', productsRouter);
app.use('/auth', authRoutes);

if (process.env.NODE_ENV === 'dev') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

serverless;
export const handler = serverless(app);
