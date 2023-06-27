import { Request, Response } from "express";

interface IUser {
  username: string;
  password: string;
}

const userDb = new Map<string, IUser>();

export async function register(req: Request, res: Response): Promise<Response> {
  const { username, password } = req.body;
  if (userDb.has(username)) {
    return res.status(400).json({ error: `duplicate username: ${username}` });
  }

  userDb.set(username, { username, password });
  return res.status(201).json({ status: `user ${username} registered` });
}

export async function login(req: Request, res: Response): Promise<Response> {
  const { username, password } = req.body;

  const user = userDb.get(username);
  if (!user) {
    return res.status(404).json({ error: `username ${username} not found` });
  }

  if (!user.password === password) {
    return res
      .status(401)
      .json({ error: `invalid password for user ${username}` });
  }

  return res.status(200).json({ status: `user ${username} logged in` });
}
