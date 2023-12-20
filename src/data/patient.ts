import { firestore } from "firebase-admin";
import Timestamp = firestore.Timestamp;
import FieldValue = firestore.FieldValue;

export type Additional = {
  [index: string]: string | number;
};

export type Name = {
  first: string;
  middle?: string;
  last: string;
};

export enum Status {
  empty = "Empty",
  inquiry = "Inquiry",
  onboarding = "Onboarding",
  active = "Active",
  churned = "Churned",
}

export class Patient {
  constructor(
    public readonly name: Name,
    public readonly dob: Date,
    public readonly status: Status,
    public readonly addresses: string[],
    public readonly additionals: Additional[]
  ) {}

  static empty() {
    return new Patient(
      { first: "", middle: "", last: "" },
      new Date(),
      Status.empty,
      [],
      []
    );
  }
}

