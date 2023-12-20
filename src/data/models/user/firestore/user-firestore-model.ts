import { User } from "../../../user";

export class UserFirestoreModel extends User {
  static kUid = "uid";
  static kName = "name";
  static kEmail = "email";

  static fromEntity(entity: User): UserFirestoreModel {
    return Object.assign(UserFirestoreModel.empty(), entity);
  }

  static empty(): UserFirestoreModel {
    return new UserFirestoreModel("", "", "");
  }

  toDocumentData() {
    return {
      [UserFirestoreModel.kUid]: this.uid,
      [UserFirestoreModel.kName]: this.name,
      [UserFirestoreModel.kEmail]: this.email,
    };
  }
}

