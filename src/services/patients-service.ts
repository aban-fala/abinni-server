import { Patient } from "../data/patient";
import { firestore } from "firebase-admin";
import * as admin from "firebase-admin";
import { PatientFirestoreModel } from "../data/models/patient/firestore/patient-firestore-model";
import FieldValue = firestore.FieldValue;
import { PartialPatientFirestoreModel } from "../data/models/patient/firestore/partial-patient-firestore-model";

export class PatientsService {
  private collection() {
    return admin.firestore().collection("patients");
  }
  private doc(patientId?: string) {
    if (!patientId) return this.collection().doc();
    return this.collection().doc(patientId);
  }

  async getPatientById(patientId: string): Promise<Patient | null> {
    const patientRes = await this.doc(patientId).get();
    if (!patientRes.exists) {
      return null;
    }
    return PatientFirestoreModel.fromDocumentData(patientRes.data());
  }

  async createPatient(patient: Patient): Promise<Patient> {
    const patientRef = this.doc();
    const data = PatientFirestoreModel.fromEntity(patient)
      .toDocumentData
      // patientRef.id,
      // FieldValue.serverTimestamp()
      ();
    await patientRef.set(data);
    return PatientFirestoreModel.fromDocumentData(
      (await patientRef.get()).data()
    );
  }

  async getPatients(): Promise<Patient[]> {
    const snapshot = await this.collection().get();
    return snapshot.docs.map((doc) =>
      PatientFirestoreModel.fromDocumentData(doc.data())
    );
  }

  async updatePatientById(
    patientId: string,
    partialPatient: Partial<Record<keyof Patient, any>>
  ): Promise<void> {
    const documentData =
      PartialPatientFirestoreModel.fromPartialEntity(
        partialPatient
      ).toDocumentData();
    console.log("update: document data: ", documentData, partialPatient);
    await this.doc(patientId).update(documentData);
  }
}

export const patientsService = new PatientsService();

