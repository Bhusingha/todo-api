import { Response } from "express";

import { IRepositoryUser } from "../repositories/user";
import { IHandlerUser, TypedRequest, Empty, WithUser } from ".";

export function newHandlerUser(repo: IRepositoryUser): IHandlerUser {
  return new HandlerUser(repo);
}

class HandlerUser implements IHandlerUser {
  private repo: IRepositoryUser;

  constructor(repo: IRepositoryUser) {
    this.repo = repo;
  }

  async register(
    req: TypedRequest<Empty, WithUser>,
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
      .createUser({ username, password })
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
    req: TypedRequest<Empty, WithUser>,
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
        if (user.password !== password) {
          return res
            .status(401)
            .json({ error: "invalid username or password" })
            .end();
        }

        return res
          .status(200)
          .json({ status: "logged in", user: { ...user, password: undefined } })
          .end();
      })
      .catch((err) => {
        console.error(`failed to get user: ${err}`);
        return res.status(500).end();
      });
  }
}
