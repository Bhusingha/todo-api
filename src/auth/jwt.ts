import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret = process.env.JWT_SECRET || "todo-secrets";

export interface Payload {
  id: number;
  username: string;
}

export function newJwt(payload: Payload): string {
  return jwt.sign(payload, secret, {
    algorithm: "HS512",
    expiresIn: "12h",
    issuer: "academy",
    subject: "registration",
    audience: "students",
  });
}

export interface JwtAuthRequest<Params, Body>
  extends Request<Params, any, Body> {
  token: string | jwt.JwtPayload;
  payload: Payload;
}

export function jwtMiddleware(
  req: JwtAuthRequest<any, any>,
  res: Response,
  next: NextFunction,
) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  try {
    if (!token) {
      return res.status(401).json({ error: "missing JWT token" }).end();
    }

    const decoded = jwt.verify(token, secret);
    const id = decoded["id"];
    const username = decoded["username"];

    if (!id) {
      return res.status(401).json({ error: "missing payload `id`" }).end();
    }
    if (!username) {
      return res
        .status(401)
        .json({ error: "missing payload `username`" })
        .end();
    }

    req.token = decoded;
    req.payload = {
      id,
      username,
    };

    return next();
  } catch (err) {
    console.error(`Auth failed for token ${token}: ${err}`);
    return res.status(401).json({ error: "authentication failed" }).end();
  }
}
