import { ITodo, IUser, ICreateUser, ICreateTodo } from "../entities";

export type RepoError = [Error, string];

export type Result<T> =
  | { success: true; value: T }
  | { success: false; error: Error };

export interface IRepositoryTodo {
  createTodo(arg: ICreateTodo): Promise<Result<ITodo>>;
  getTodoById(id: number): Promise<Result<ITodo | null>>;
  getTodos(): Promise<ITodo[]>;
  deleteTodoById(id: number): Promise<ITodo>;
  deleteTodos(): Promise<void>;
  updateTodo(id: number, msg: string): Promise<ITodo>;
}

export interface IRepositoryUser {
  createUser(user: ICreateUser): Promise<Result<IUser>>;
  getUser(username: string): Promise<Result<IUser | null>>;
}
