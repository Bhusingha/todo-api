export interface ITodo {
  id: number;
  msg: string;
}

export interface IUser {
  id: number;
  username: string;
  password: string;
}

export interface ICreateUser {
  username: string;
  password: string;
}

export interface ICreateTodo {
  ownerId: number;
  msg: string;
}
