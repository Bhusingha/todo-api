import { PrismaClient } from "@prisma/client";

import { IUser } from "../entities";
import { IRepositoryUser, ICreateUser } from ".";

export function newRepositoryUser(db: PrismaClient): IRepositoryUser {
  return new RepositoryUser(db);
}

class RepositoryUser implements IRepositoryUser {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createUser(user: ICreateUser): Promise<IUser> {
    return await this.db.user
      .create({ data: user })
      .catch((err) =>
        Promise.reject(`failed to create user ${user.username}: ${err}`),
      );
  }

  // Reject if not found
  async getUser(username: string): Promise<IUser> {
    return await this.db.user
      .findUnique({ where: { username } })
      .then((user) => {
        if (!user) {
          return Promise.reject(`no such user ${username}`);
        }

        return Promise.resolve(user);
      });
  }
}
