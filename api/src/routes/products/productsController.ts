import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { productsTable } from '../../db/productsSchema.js';
import { eq } from 'drizzle-orm';
import _ from 'lodash';

export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));

    if (!product) {
      res.status(404).send({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    // A way that we can skip to save other things than name and price
    // so if someone would send "id", then the "id" would be skipped and only the name and price
    // would be saved. We do this because we autimatically add the id to our created products.
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: 'Product was not found!' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();
    if (deletedProduct) {
      res.status(204).send({ message: 'Product deleted successfully!' });
    } else {
      res.status(404).send({ message: 'Product was not found!' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
