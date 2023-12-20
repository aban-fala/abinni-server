import { HttpResponseError } from "../../../../utils/http-response-error";
import { Status } from "../../../patient";

export function validatePatientName(name) {
  if (!name.first?.length) {
    throw new HttpResponseError(
      400,
      "BAD_REQUEST",
      "First name can not be empty"
    );
  }
  if (!name.last?.length) {
    throw new HttpResponseError(
      400,
      "BAD_REQUEST",
      "Last name can not be empty"
    );
  }
}

export function validatePatientAddresses(addresses) {
  if (!addresses?.length) {
    throw new HttpResponseError(
      400,
      "BAD_REQUEST",
      "Must have at least one address"
    );
  }
}

export function validatePatientStatus(status) {
  if (!status || !Object.values(Status).includes(status as Status)) {
    throw new HttpResponseError(400, "BAD_REQUEST", "Status is not valid");
  }
}

