import { RootController } from "./root-controller";
import { AccountController } from "./account-controller/account-controller";
import { Controller } from "./index";
import { PatientController } from "./patient-controller/patient-controller";

export const getControllers = (): Array<Controller> => [
  new RootController(),
  new PatientController(),
  new AccountController(),
];

