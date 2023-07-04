import { ITodo, IUser, ICreateUser, ICreateTodo } from "../entities";

export interface IRepositoryTodo {
  createTodo(arg: ICreateTodo): Promise<ITodo>;
  getTodoById(id: number): Promise<ITodo | null>;
  getUserTodoById(arg: { id: number; ownerId: number }): Promise<ITodo | null>;
  getTodos(): Promise<ITodo[]>;
  getUserTodos(ownerId: number): Promise<ITodo[]>;
  deleteTodoById(id: number): Promise<ITodo>;
  deleteUserTodoById(arg: { id: number; ownerId: number }): Promise<ITodo>;
  deleteTodos(): Promise<void>;
  deleteUserTodos(ownerId: number): Promise<void>;
  updateTodo(arg: { id: number; msg: string }): Promise<ITodo>;
  updateUserTodo(arg: {
    id: number;
    ownerId: number;
    msg: string;
  }): Promise<ITodo>;
}

export interface IRepositoryUser {
  createUser(user: ICreateUser): Promise<IUser>;
  getUser(username: string): Promise<IUser>;
}

export interface IRepositoryBlacklist {
  addToBlacklist(token: string): Promise<void>;
  isBlacklisted(token: string): Promise<boolean>;
}
