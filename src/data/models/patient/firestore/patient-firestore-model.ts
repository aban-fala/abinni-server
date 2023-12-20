import { Patient, Status } from "../../../patient";

export class PatientFirestoreModel extends Patient {
  static kUid = "uid";
  static kName = "name";
  static kDob = "dob";
  static kStatus = "status";
  static kAddresses = "addresses";
  static kAdditionals = "additionals";

  static fromEntity(entity: Patient): PatientFirestoreModel {
    return Object.assign(PatientFirestoreModel.empty(), entity);
  }

  static empty(): PatientFirestoreModel {
    return new PatientFirestoreModel(
      { first: "", middle: "", last: "" },
      new Date(),
      Status.empty,
      [],
      []
    );
  }

  toDocumentData() {
    return {
      [PatientFirestoreModel.kName]: this.name,
      [PatientFirestoreModel.kDob]: this.dob,
      [PatientFirestoreModel.kStatus]: this.status,
      [PatientFirestoreModel.kAddresses]: this.addresses,
      [PatientFirestoreModel.kAdditionals]: this.additionals,
    };
  }

  static fromDocumentData(data: FirebaseFirestore.DocumentData) {
    return new PatientFirestoreModel(
      data[PatientFirestoreModel.kName],
      data[PatientFirestoreModel.kDob],
      data[PatientFirestoreModel.kStatus],
      data[PatientFirestoreModel.kAddresses],
      data[PatientFirestoreModel.kAdditionals]
    );
  }
}

