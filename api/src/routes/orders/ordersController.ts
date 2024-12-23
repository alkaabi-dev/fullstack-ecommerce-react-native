import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { orderItemsTable, ordersTable } from '../../db/ordersSchema.js';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { order, items } = req.cleanBody;
    const userId = req.userId;
    console.log(userId);

    if (!userId) {
      res.status(400).json({ message: 'Invalid order data' });
    }

    const [newOrder] = await db
      .insert(ordersTable)
      .values({ userId: userId })
      .returning();

    // TODO: Validate products ids, and take their actual price from DB.
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();

    res.status(201).json({ ...newOrder, items: newOrderItems });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Invalid order data' });
  }
};
