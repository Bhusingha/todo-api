import { PrismaClient } from "@prisma/client";

import { IRepositoryTodo, Result } from ".";
import { isError, ERR_DUPLICATE_PKEY, ERR_WHERE_NOT_FOUND } from "./error";
import { ICreateTodo, ITodo } from "../entities";

export function newRepositoryTodo(db: PrismaClient): IRepositoryTodo {
  return new RepositoryTodo(db);
}

class RepositoryTodo implements IRepositoryTodo {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createTodo(todo: ICreateTodo): Promise<Result<ITodo>> {
    try {
      const created = await this.db.todo.create({
        data: todo,
      });
      return Promise.resolve({ success: true, value: created });
    } catch (err) {
      if (isError(err, ERR_DUPLICATE_PKEY)) {
        return Promise.resolve({
          success: false,
          error: Error(err),
        });
      }

      return Promise.reject(err);
    }
  }

  async getTodoById(id: number): Promise<Result<ITodo | null>> {
    try {
      const todo = await this.db.todo.findUnique({
        where: {
          id,
        },
      });

      return Promise.resolve({ success: true, value: todo });
    } catch (err) {
      if (isError(err, ERR_WHERE_NOT_FOUND)) {
        return Promise.resolve({ success: false, error: err });
      }

      return Promise.reject(err);
    }
  }

  async getUserTodoById(where: {
    ownerId: number;
    id: number;
  }): Promise<Result<ITodo | null>> {
    try {
      const user = await this.db.todo.findFirst({
        where,
      });

      return Promise.resolve({ success: true, value: user });
    } catch (err) {
      if (isError(err, ERR_WHERE_NOT_FOUND)) {
        return Promise.resolve({ success: false, error: err });
      }

      return Promise.reject(err);
    }
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
