import { Patient } from "../../../patient";
import {
  validatePatientAddresses,
  validatePatientName,
  validatePatientStatus,
} from "./validators";
import { PatientClientModel } from "./patient-client-model";

export class PartialPatientClientModel {
  private static _validate(body: any) {
    if (body[PatientClientModel.kName])
      validatePatientName(body[PatientClientModel.kName]);
    if (body[PatientClientModel.kName])
      validatePatientAddresses(body[PatientClientModel.kAddresses]);
    if (body[PatientClientModel.kStatus])
      validatePatientStatus(body[PatientClientModel.kStatus]);
  }

  static validate(body: any): Partial<Record<keyof Patient, any>> {
    this._validate(body);
    const res: Partial<Record<keyof Patient, any>> = {};
    if (body[PatientClientModel.kName])
      res.name = body[PatientClientModel.kName];
    if (body[PatientClientModel.kDob]) res.dob = body[PatientClientModel.kDob];
    if (body[PatientClientModel.kStatus])
      res.status = body[PatientClientModel.kStatus];
    if (body[PatientClientModel.kAddresses])
      res.addresses = body[PatientClientModel.kAddresses];
    if (body[PatientClientModel.kAdditionals])
      res.additionals = body[PatientClientModel.kAdditionals];
    return res;
  }
}

