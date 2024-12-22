import { Router } from 'express';
import {
  createUserSchema,
  loginSchema,
  usersTable,
} from '../../db/usersSchema';
import { validateData } from '../../middlewares/validationMiddleware';
import bcrypt from 'bcryptjs';
import { db } from '../../db/index';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();

    // Remove password so we dont send the password as json to user
    // @ts-ignore
    delete user.password;

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

router.post('/login', validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    // Create a jwt token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      // process.env.YOUR_SECRET,
      'your-secret',
      { expiresIn: '30d' }
    );

    // @ts-ignore
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

export default router;
