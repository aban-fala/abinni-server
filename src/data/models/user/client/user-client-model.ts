import { User } from "../../../user";
import { validateUserEmail } from "./validators";

export class UserClientModel extends User {
  static kUid = "uid";
  static kEmail = "email";

  static fromEntity(entity: User): UserClientModel {
    return Object.assign(UserClientModel.empty(), entity);
  }

  static empty(): UserClientModel {
    return new UserClientModel("", "");
  }

  toBody() {
    return {
      [UserClientModel.kUid]: this.uid,
      [UserClientModel.kEmail]: this.email,
    };
  }

  static fromBody(body: any): UserClientModel & { password: string } {
    validateUserEmail(body[UserClientModel.kEmail]);

    return Object.assign(
      new UserClientModel(null, body[UserClientModel.kEmail])
    );
  }
}

