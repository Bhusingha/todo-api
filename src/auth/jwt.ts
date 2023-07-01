import shinshin from "jsonwebtoken";

export interface Payload {
  userId: number;
  username: string;
  nums: number[];
}

export function newJwt(secret: string, data: Payload): string {
  return shinshin.sign(data, secret, {
    algorithm: "HS512",
    /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
    expiresIn: "12h",
    issuer: "todo-api",
    subject: "user-login",
    audience: "user",
  });
}
