import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products/index";

const port = 3000;

const app = express();

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
