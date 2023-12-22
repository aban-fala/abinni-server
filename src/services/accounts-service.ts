import { UserRecord } from "firebase-admin/lib/auth";
import * as admin from "firebase-admin";
import { HttpResponseError } from "../utils/http-response-error";
import { User } from "../data/user";
import { UserFirestoreModel } from "../data/models/user/firestore/user-firestore-model";

class AccountsService {
  async createAccount(userInput: User, password: string): Promise<User> {
    try {
      const createUserRes = await admin.auth().createUser({
        email: userInput.email,
      });
      const user = userInput.copyWith({ uid: createUserRes.uid });
      const documentData = UserFirestoreModel.fromEntity(user).toDocumentData();
      await admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set(documentData);
      return user;
    } catch (e) {
      switch (e.code) {
        case "auth/email-already-exists":
          return userInput;
      }
      throw e;
    }
  }
}

export const accountsService: AccountsService = new AccountsService();

