import { Response } from "express";

import { hashPassword, compareHash } from "../auth/bcrypt";
import { IRepositoryUser } from "../repositories";
import { IHandlerUser, AppRequest, Empty, WithUser } from ".";
import { Payload, newJwt } from "../auth/jwt";

export function newHandlerUser(repo: IRepositoryUser): IHandlerUser {
  return new HandlerUser(repo);
}

class HandlerUser implements IHandlerUser {
  private repo: IRepositoryUser;

  constructor(repo: IRepositoryUser) {
    this.repo = repo;
  }

  async register(
    req: AppRequest<Empty, WithUser>,
    res: Response,
  ): Promise<Response> {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "missing username or password" })
        .end();
    }

    return this.repo
      .createUser({ username, password: hashPassword(password) })
      .then((user) =>
        res
          .status(201)
          .json({ ...user, password: undefined })
          .end(),
      )
      .catch((err) => {
        const errMsg = `failed to create user ${username}`;
        console.error(`${errMsg}: ${err}`);
        return res.status(500).json({ error: errMsg }).end();
      });
  }

  async login(
    req: AppRequest<Empty, WithUser>,
    res: Response,
  ): Promise<Response> {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "missing username or password" })
        .end();
    }

    return this.repo
      .getUser(username)
      .then((user) => {
        if (!compareHash(password, user.password)) {
          return res
            .status(401)
            .json({ error: "invalid username or password" })
            .end();
        }

        const payload: Payload = { id: user.id, username: user.username };
        const token = newJwt(payload);

        return res
          .status(200)
          .json({
            status: "logged in",
            id: user.id,
            username,
            token,
          })
          .end();
      })
      .catch((err) => {
        console.error(`failed to get user: ${err}`);
        return res.status(500).end();
      });
  }
}
