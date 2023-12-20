import { HttpResponseError } from "../../../../utils/http-response-error";
import { validateEmail } from "../../../../utils/validators";

export function validateUserName(name: string) {
  if (!name?.length)
    throw new HttpResponseError(400, "BAD_REQUEST", 'Invalid "name"');
}

export function validateUserEmail(email: string) {
  if (!validateEmail(email))
    throw new HttpResponseError(400, "BAD_REQUEST", 'Invalid "email"');
}

export function validateUserPassword(password: string) {
  if (!password?.length || password.length < 6)
    throw new HttpResponseError(400, "BAD_REQUEST", 'Invalid "password"');
}

