import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products/index";
import authRoutes from "./routes/auth/index";

const port = 3000;

const app = express();

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/products", productsRouter);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
