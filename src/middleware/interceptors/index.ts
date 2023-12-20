import { Request, Response, NextFunction } from "express";
import { verifyValidFirebaseUidTokenInterceptor } from "./verify-valid-firebase-uid-token-interceptor";
import bodyParser from "body-parser";

export const interceptors: Array<
  (req: Request, res: Response, next: NextFunction) => void
> = [
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),

  // Setting default values
  (req, res, next) => {
    req.claims = {};
    next();
  },
  (req, res, next) => {
    // Exclude "createUser" route from authentication
    if (req.path === "/account") {
      return next();
    }

    // Perform Firebase authentication for other routes
    verifyValidFirebaseUidTokenInterceptor(req, res, next);
  },
];

