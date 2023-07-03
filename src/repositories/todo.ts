import { PrismaClient } from "@prisma/client";

import { IRepositoryTodo } from ".";
import { ICreateTodo, ITodo } from "../entities";

export function newRepositoryTodo(db: PrismaClient): IRepositoryTodo {
  return new RepositoryTodo(db);
}

class RepositoryTodo implements IRepositoryTodo {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createTodo(arg: ICreateTodo): Promise<ITodo> {
    return this.db.todo.create({
      data: {
        msg: arg.msg,
        owner: {
          connect: {
            id: arg.ownerId,
          },
        },
      },
    });
  }

  async getTodoById(id: number): Promise<ITodo | null> {
    return await this.db.todo.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserTodoById(where: {
    ownerId: number;
    id: number;
  }): Promise<ITodo | null> {
    return await this.db.todo.findFirst({
      where,
    });
  }

  async getTodos(): Promise<ITodo[]> {
    return await this.db.todo.findMany();
  }

  async getUserTodos(ownerId: number): Promise<ITodo[]> {
    return this.db.todo.findMany({
      where: {
        ownerId,
      },
    });
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
