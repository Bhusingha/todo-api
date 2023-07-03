import { Prisma } from "@prisma/client";
import { RepoError } from ".";

export const ERR_PKEY_NOT_FOUND: RepoError = [Error("key not found"), ""];
export const ERR_DUPLICATE_PKEY: RepoError = [
  Error("duplicate primary key"),
  "P002",
];
export const ERR_FKEY: RepoError = [
  Error("foreign key constraints failed"),
  "P2003",
];
export const ERR_WHERE_NOT_FOUND: RepoError = [
  Error("record not found with WHERE clause"),
  "P2001",
];

export function isError(err: unknown, target: RepoError): boolean {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === target[1]) {
      return true;
    }
  }

  return false;
}
