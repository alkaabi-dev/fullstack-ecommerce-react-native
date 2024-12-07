import { Request, Response } from "express";

export const listProducts = (req: Request, res: Response) => {
  res.send("listProducts");
};

export const getProductById = (req: Request, res: Response) => {
  res.send("getProductById");
};

export const createProduct = (req: Request, res: Response) => {
  res.send("createProduct");
};

export const updateProduct = (req: Request, res: Response) => {
  res.send("updateProduct");
};

export const deleteProduct = (req: Request, res: Response) => {
  res.send("deleteProduct");
};
