import { Patient, Status } from "../../../patient";
import {
  validatePatientAddresses,
  validatePatientName,
  validatePatientStatus,
} from "./validators";

export class PatientClientModel extends Patient {
  static kId = "id";
  static kName = "name";
  static kDob = "dob";
  static kStatus = "status";
  static kAddresses = "addresses";
  static kAdditionals = "additionals";

  static fromEntity(entity: Patient): PatientClientModel {
    return Object.assign(PatientClientModel.empty(), entity);
  }

  static empty(): PatientClientModel {
    return new PatientClientModel(
      "",
      { first: "", middle: "", last: "" },
      new Date(),
      Status.empty,
      [],
      null
    );
  }

  static _validate(body: any) {
    validatePatientName(body[PatientClientModel.kName]);
    validatePatientAddresses(body[PatientClientModel.kAddresses]);
    validatePatientStatus(body[PatientClientModel.kStatus]);
  }

  static validate(body: any): PatientClientModel {
    this._validate(body);
    return new PatientClientModel(
      body[PatientClientModel.kId],
      body[PatientClientModel.kName],
      body[PatientClientModel.kDob],
      body[PatientClientModel.kStatus],
      body[PatientClientModel.kAddresses],
      body[PatientClientModel.kAdditionals]
    );
  }

  toBodyPublicPatient() {
    return {
      [PatientClientModel.kId]: this.id,
      [PatientClientModel.kName]: this.name,
      [PatientClientModel.kDob]: this.dob,
      [PatientClientModel.kStatus]: this.status,
      [PatientClientModel.kAddresses]: this.addresses,
      [PatientClientModel.kAdditionals]: this.additionals,
    };
  }
}

