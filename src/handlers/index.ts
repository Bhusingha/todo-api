import { Request, Response } from "express";
import { JwtAuthRequest } from "../auth/jwt";

// Custom Express `Request` (no Query)
export interface AppRequest<Params, Body> extends Request<Params, any, Body> {}

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
  createTodo: HandlerFunc<JwtAuthRequest<Empty, WithMsg>>;
  getTodos: HandlerFunc<JwtAuthRequest<Request, any>>;
  getTodo: HandlerFunc<JwtAuthRequest<WithId, any>>;
  updateTodo: HandlerFunc<JwtAuthRequest<WithId, WithMsg>>;
  deleteTodo: HandlerFunc<JwtAuthRequest<WithId, Empty>>;
  deleteTodos: HandlerFunc<JwtAuthRequest<Empty, Empty>>;
}

export interface IHandlerUser {
  register: HandlerFunc<AppRequest<Empty, WithUser>>;
  login: HandlerFunc<AppRequest<Empty, WithUser>>;
}
