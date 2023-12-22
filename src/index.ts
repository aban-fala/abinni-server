// noinspection HttpUrlsUsage

import cors from "cors";
import express, { Express } from "express";
import * as admin from "firebase-admin";
import { environment } from "./environment/environment";
import { HttpServer } from "./middleware/controllers";
import { getControllers } from "./middleware/controllers/controllers";
import { interceptors } from "./middleware/interceptors";
import { myIPv4 } from "./utils/ipv4";
import { log } from "./utils/logger";

export type MyClaims = "authenticated";

if (!environment?.firebase?.credentials?.project_id?.length) {
  throw Error(
    'Missing Firebase Credentials. Please, check the "Getting Started" section'
  );
}

admin.initializeApp({
  credential: admin.credential.cert(environment.firebase.credentials as any),
  projectId: environment.firebase.credentials.project_id,
  databaseURL: environment.firebase.databaseURL,
});

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React app's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies)
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app: Express = express();
const httpServer = new HttpServer(app);
const port = process.env.PORT || 5000;

app.use(cors(corsOptions));

for (let i = 0; i < interceptors.length; i++) {
  app.use(interceptors[i]);
}

getControllers().forEach((controller) => {
  controller.initialize(httpServer);
});

app.listen(port, () => {
  log(`⚡️ Server is running at http://${myIPv4()}:${port}`);
});

