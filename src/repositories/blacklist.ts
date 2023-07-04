import { RedisClientType } from "redis";

import { IRepositoryBlacklist } from ".";

const keyBlacklist = "todo-jwt-blacklist";

export function newRepositoryBlacklist(
  db: RedisClientType<any, any, any>,
): IRepositoryBlacklist {
  return new RepositoryBlacklist(db);
}

class RepositoryBlacklist {
  private db: RedisClientType<any, any, any>;

  constructor(db: RedisClientType<any, any, any>) {
    this.db = db;
  }

  async addToBlacklist(token: string): Promise<void> {
    await this.db.sAdd(keyBlacklist, token);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    return await this.db.sIsMember(keyBlacklist, token);
  }
}
