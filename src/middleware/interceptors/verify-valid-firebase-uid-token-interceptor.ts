import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";

const _idToken = (req: Request) => {
  const authorizationHeaderValue: string | undefined = (
    req.headers["Authorization"]?.length
      ? req.headers["Authorization"]
      : req.headers["authorization"]
  )?.toString();
  if (
    !authorizationHeaderValue?.length ||
    authorizationHeaderValue.length <= 16
  ) {
    return null;
  }
  if (authorizationHeaderValue?.toLowerCase()?.startsWith("bearer ")) {
    return authorizationHeaderValue.substring("bearer ".length);
  }
  return authorizationHeaderValue;
};

export const verifyValidFirebaseUidTokenInterceptor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken = _idToken(req);
  if (!idToken) {
    return res
      .status(401)
      .json({ error: "Unauthorized. No ID token provided." });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      // Attach user information to the request
      req.token = decodedToken;
      next();
    })
    .catch((error) => {
      console.error("Error verifying Firebase ID token:", error);
      return res.status(401).json({ error: "Unauthorized. Invalid ID token." });
    });
};

