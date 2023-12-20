import { Patient } from "../../../patient";
import { PatientFirestoreModel } from "./patient-firestore-model";

export class PartialPatientFirestoreModel {
  static fromPartialEntity(
    partialPatient: Partial<Record<keyof Patient, any>>
  ) {
    return {
      ...partialPatient,
      toDocumentData(): Partial<Record<keyof string, any>> {
        const res: Partial<Record<keyof string, any>> = {};

        if (partialPatient.name)
          res[PatientFirestoreModel.kName] = partialPatient.name;
        if (partialPatient.dob)
          res[PatientFirestoreModel.kDob] = partialPatient.dob;
        if (partialPatient.status)
          res[PatientFirestoreModel.kStatus] = partialPatient.status;
        if (partialPatient.addresses)
          res[PatientFirestoreModel.kAddresses] = partialPatient.addresses;
        if (partialPatient.additionals)
          res[PatientFirestoreModel.kAdditionals] = partialPatient.additionals;
        return res;
      },
    };
  }
}

