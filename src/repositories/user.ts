import { PrismaClient } from "@prisma/client";

import { IRepositoryUser, Result } from ".";
import { ERR_DUPLICATE_PKEY, ERR_PKEY_NOT_FOUND, isError } from "./error";
import { IUser, ICreateUser } from "../entities";

export function newRepositoryUser(db: PrismaClient): IRepositoryUser {
  return new RepositoryUser(db);
}

class RepositoryUser implements IRepositoryUser {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createUser(user: ICreateUser): Promise<Result<IUser>> {
    try {
      const created = await this.db.user.create({ data: user });
      return Promise.resolve({ success: true, value: created });
    } catch (err) {
      if (isError(err, ERR_DUPLICATE_PKEY)) {
        return Promise.resolve({
          success: false,
          error: Error(`${ERR_DUPLICATE_PKEY[0]}: ${err}`),
        });
      }

      return Promise.reject(err);
    }
  }

  // Reject if not found
  async getUser(username: string): Promise<Result<IUser>> {
    try {
      const user = await this.db.user.findUnique({ where: { username } });
      if (!user) {
        return Promise.resolve({
          success: false,
          error: ERR_PKEY_NOT_FOUND[0],
        });
      }
      return Promise.resolve({ success: true, value: user });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
