import { compareHash, hashPassword } from "./utils/bcrypt";

const password = "1234";

const hashedPassword = hashPassword(password);
console.log(compareHash(password, hashedPassword));
