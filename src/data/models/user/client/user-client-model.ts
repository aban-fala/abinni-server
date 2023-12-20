import { User } from "../../../user";
import {
  validateUserEmail,
  validateUserName,
  validateUserPassword,
} from "./validators";

export class UserClientModel extends User {
  static kUid = "uid";
  static kName = "name";
  static kEmail = "email";
  static kPassword = "password";

  static fromEntity(entity: User): UserClientModel {
    return Object.assign(UserClientModel.empty(), entity);
  }

  static empty(): UserClientModel {
    return new UserClientModel("", "", "");
  }

  toBody() {
    return {
      [UserClientModel.kUid]: this.uid,
      [UserClientModel.kName]: this.name,
      [UserClientModel.kEmail]: this.email,
    };
  }

  static fromBody(body: any): UserClientModel & { password: string } {
    validateUserName(body[UserClientModel.kName]);
    validateUserEmail(body[UserClientModel.kEmail]);
    validateUserPassword(body[UserClientModel.kPassword]);

    return Object.assign(
      new UserClientModel(
        null,
        body[UserClientModel.kName],
        body[UserClientModel.kEmail]
      ),
      { password: body[UserClientModel.kPassword] }
    );
  }
}

