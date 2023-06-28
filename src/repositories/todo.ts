import { PrismaClient } from "@prisma/client";

import { IRepositoryTodo } from ".";
import { ITodo } from "../entities";

export function newRepositoryTodo(db: PrismaClient): IRepositoryTodo {
  return new RepositoryTodo(db);
}

class RepositoryTodo implements IRepositoryTodo {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createTodo(msg: string): Promise<ITodo> {
    return this.db.todo.create({
      data: { msg },
    });
  }

  async getTodoById(id: number): Promise<ITodo | null> {
    return await this.db.todo.findUnique({
      where: {
        id,
      },
    });
  }

  async getTodos(): Promise<ITodo[]> {
    return await this.db.todo.findMany();
  }

  async deleteTodoById(id: number): Promise<ITodo> {
    return await this.db.todo.delete({
      where: { id },
    });
  }

  async deleteTodos(): Promise<void> {
    await this.db.todo.deleteMany();
  }

  async updateTodo(id: number, msg: string): Promise<ITodo> {
    return await this.db.todo.update({
      where: { id },
      data: {
        msg,
      },
    });
  }
}
