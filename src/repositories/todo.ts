import { PrismaClient } from "@prisma/client";

import { ITodo } from "../entities/todo";

export interface IRepositoryTodo {
  createTodo(msg: string): Promise<ITodo>;
  getTodoById(id: number): Promise<ITodo | null>;
  getTodos(): Promise<ITodo[]>;
  deleteTodoById(id: number): Promise<ITodo>;
  deleteTodos(): Promise<void>;
  updateTodo(id: number, msg: string): Promise<ITodo>;
}

export function newRepositoryTodo(db: PrismaClient) {
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
