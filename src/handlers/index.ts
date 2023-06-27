import { Express, Request, Response } from "express";

// Custom Express `Request` (no Query)
export interface TypedRequest<Params, Body> extends Express.Request {
  params: Params;
  body: Body;
}

export interface Empty {}

export interface WithId {
  id: string;
}

export interface WithMsg {
  msg: string;
}

export interface WithUser {
  username: string;
  password: string;
}

export type HandlerFunc<Req> = (req: Req, res: Response) => Promise<Response>;

export interface IHandlerTodo {
  createTodo: HandlerFunc<TypedRequest<Empty, WithMsg>>;
  getTodos: HandlerFunc<TypedRequest<Request, any>>;
  getTodo: HandlerFunc<TypedRequest<WithId, any>>;
  updateTodo: HandlerFunc<TypedRequest<WithId, WithMsg>>;
  deleteTodo: HandlerFunc<TypedRequest<WithId, Empty>>;
  deleteTodos: HandlerFunc<Request>;
}

export interface IHandlerUser {
  register: HandlerFunc<TypedRequest<Empty, WithUser>>;
  login: HandlerFunc<TypedRequest<Empty, WithUser>>;
}
