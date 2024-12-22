import { Router } from 'express';
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productsController';
import { validateData } from '../../../src/middlewares/validationMiddleware';
import {
  createProductSchema,
  updateProductSchema,
} from '../../../src/db/productsSchema';
import { verifyToken, verifySeller } from '../../middlewares/authMiddleware';

// products endpoint
const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post(
  '/',
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct
);
router.put(
  '/:id',
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct
);
router.delete('/:id', verifyToken, verifySeller, deleteProduct);

export default router;
