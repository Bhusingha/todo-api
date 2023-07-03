import { ITodo, IUser, ICreateUser, ICreateTodo } from "../entities";

export interface IRepositoryTodo {
  createTodo(arg: ICreateTodo): Promise<ITodo>;
  getTodoById(id: number): Promise<ITodo | null>;
  getTodos(): Promise<ITodo[]>;
  getUserTodos(ownerId: number): Promise<ITodo[]>;
  deleteTodoById(id: number): Promise<ITodo>;
  deleteTodos(): Promise<void>;
  updateTodo(id: number, msg: string): Promise<ITodo>;
}

export interface IRepositoryUser {
  createUser(user: ICreateUser): Promise<IUser>;
  getUser(username: string): Promise<IUser>;
}
