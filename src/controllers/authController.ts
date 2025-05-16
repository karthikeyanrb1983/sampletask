/** @format */

import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const repo = AppDataSource.getRepository(User);

    const existing = await repo.findOne({ where: { email } });

    if (existing) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = repo.create({ name, email, password: hashed });
    await repo.save(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
