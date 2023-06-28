import { ITodo, IUser } from "../entities";

export interface IRepositoryTodo {
  createTodo(msg: string): Promise<ITodo>;
  getTodoById(id: number): Promise<ITodo | null>;
  getTodos(): Promise<ITodo[]>;
  deleteTodoById(id: number): Promise<ITodo>;
  deleteTodos(): Promise<void>;
  updateTodo(id: number, msg: string): Promise<ITodo>;
}

export interface ICreateUser {
  username: string;
  password: string;
}

export interface IRepositoryUser {
  createUser(user: ICreateUser): Promise<IUser>;
  getUser(username: string): Promise<IUser>;
}
