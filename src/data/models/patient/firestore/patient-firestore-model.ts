import { Patient, Status } from "../../../patient";

export class PatientFirestoreModel extends Patient {
  static kId = "id";
  static kName = "name";
  static kDob = "dob";
  static kStatus = "status";
  static kAddresses = "addresses";
  static kAdditionals = "additionals";

  static fromEntity(entity: Patient, id: string): PatientFirestoreModel {
    return Object.assign(PatientFirestoreModel.empty(), entity, { id });
  }

  static empty(): PatientFirestoreModel {
    return new PatientFirestoreModel(
      "",
      { first: "", middle: "", last: "" },
      new Date(),
      Status.empty,
      [],
      null
    );
  }

  toDocumentData() {
    return {
      [PatientFirestoreModel.kId]: this.id,
      [PatientFirestoreModel.kName]: this.name,
      [PatientFirestoreModel.kDob]: this.dob,
      [PatientFirestoreModel.kStatus]: this.status,
      [PatientFirestoreModel.kAddresses]: this.addresses,
      [PatientFirestoreModel.kAdditionals]: this.additionals,
    };
  }

  static fromDocumentData(data: FirebaseFirestore.DocumentData) {
    return new PatientFirestoreModel(
      data[PatientFirestoreModel.kId],
      data[PatientFirestoreModel.kName],
      data[PatientFirestoreModel.kDob],
      data[PatientFirestoreModel.kStatus],
      data[PatientFirestoreModel.kAddresses],
      data[PatientFirestoreModel.kAdditionals]
    );
  }
}

