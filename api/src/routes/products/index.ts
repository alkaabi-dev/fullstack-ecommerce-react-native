import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController";
import { validateData } from "../../../src/middlewares/validationMiddleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../../../src/db/productsSchema";

// products endpoint
const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", validateData(createProductSchema), createProduct);
router.put("/:id", validateData(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
