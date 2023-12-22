import { User } from "../../../user";

export class UserFirestoreModel extends User {
  static kEmail = "email";

  static fromEntity(entity: User): UserFirestoreModel {
    return Object.assign(UserFirestoreModel.empty(), entity);
  }

  static empty(): UserFirestoreModel {
    return new UserFirestoreModel("", "");
  }

  toDocumentData() {
    return {
      [UserFirestoreModel.kEmail]: this.email,
    };
  }
}

