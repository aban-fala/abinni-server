import { HttpResponseError } from "../../../../utils/http-response-error";
import { validateEmail } from "../../../../utils/validators";

export function validateUserEmail(email: string) {
  if (!validateEmail(email))
    throw new HttpResponseError(400, "BAD_REQUEST", 'Invalid "email"');
}

