import { PrismaClient } from "@prisma/client";
import express from "express";

import { newRepositoryTodo } from "./repositories/todo";

import { newHandlerTodo } from "./handlers/todo";
import { login, register } from "./handlers/user";

async function main() {
  const db = new PrismaClient();

  const port = process.env.PORT || 8000;
  const server = express();
  const userRouter = express.Router();
  const todoRouter = express.Router();

  server.use(express.json());
  server.use("/user", userRouter);
  server.use("/todo", todoRouter);

  const repoTodo = newRepositoryTodo(db);
  const handlerTodo = newHandlerTodo(repoTodo);

  // Check server status
  server.get("/", (_, res) => {
    return res.status(200).json({ status: "ok" }).end();
  });

  // User API
  userRouter.post("/register", register);
  userRouter.post("/login", login);

  // To-do API
  todoRouter.post("/", handlerTodo.createTodo.bind(handlerTodo));
  todoRouter.get("/", handlerTodo.getTodos.bind(handlerTodo));
  todoRouter.get("/:id", handlerTodo.getTodo.bind(handlerTodo));
  // Guard invalid path for missing `id`
  todoRouter.post("/update", async (_, res) => {
    return res.status(400).json({ error: "missing params id" }).end();
  });
  todoRouter.post("/update/:id", handlerTodo.updateTodo.bind(handlerTodo));
  todoRouter.delete("/", handlerTodo.deleteTodos.bind(handlerTodo));
  todoRouter.delete("/:id", handlerTodo.deleteTodo.bind(handlerTodo));

  server.listen(port, () => console.log(`server listening on ${port}`));
}

main();
