import { Controller, HttpServer } from "../index";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { patientsService } from "../../../services/patients-service";
import { HttpResponseError } from "../../../utils/http-response-error";
import { Patient } from "../../../data/patient";
import { PatientClientModel } from "../../../data/models/patient/client/patient-client-model";
import { PartialPatientClientModel } from "../../../data/models/patient/client/partial-patient-client-model";
import { logInfo } from "../../../utils/logger";

export class PatientController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.post("/patient", this.createPatient.bind(this));
    httpServer.get("/patients", this.getAllPatients.bind(this));

    httpServer.get("/patient/:patientId", this.getPatientByIdPublic.bind(this));

    httpServer.put("/patient/:patientId", this.updatePatientById.bind(this));
  }

  private readonly createPatient: RequestHandler = async (req, res, next) => {
    const patientFromInput: Patient = PatientClientModel.validate(req.body);
    console.log("createPatient: patientFromInput", patientFromInput);
    const patient = await patientsService.createPatient(patientFromInput);
    const output = PatientClientModel.fromEntity(patient).toBodyPublicPatient();
    res.send(output);
    next();
  };

  private readonly getAllPatients: RequestHandler = async (req, res, next) => {
    const patients = await patientsService.getPatients();
    const outputList = patients.map((patient) =>
      PatientClientModel.fromEntity(patient).toBodyPublicPatient()
    );
    res.send({
      patients: outputList,
    });
    next();
  };

  private readonly getPatientByIdPublic: RequestHandler = async (
    req,
    res,
    next
  ) => {
    // No need to check if the user has permission
    return this.handleGetPatientById(req, res, next, (patient) =>
      PatientClientModel.fromEntity(patient).toBodyPublicPatient()
    );
  };

  private async handleGetPatientById(
    req: Request,
    res: Response,
    next: NextFunction,
    toOutput: (patient: Patient) => any
  ) {
    if (!req.params["patientId"]?.length) {
      throw new HttpResponseError(
        400,
        "BAD_REQUEST",
        "Please, inform a patientId on the route"
      );
    }
    const patient = await patientsService.getPatientById(
      req.params["patientId"]
    );
    if (patient == null) {
      throw new HttpResponseError(
        404,
        "NOT_FOUND",
        "Patient ID " + req.params["patientId"] + " was not found"
      );
    }
    res.send(toOutput(patient));
    next();
  }

  private readonly updatePatientById: RequestHandler = async (
    req,
    res,
    next
  ) => {
    if (!req.params["patientId"]?.length)
      throw new HttpResponseError(
        400,
        "BAD_REQUEST",
        'Please, inform the "patientId" as parameter'
      );

    const partialPatient = PartialPatientClientModel.validate(req.body);
    const patient = await patientsService.getPatientById(
      req.params["patientId"]
    );
    if (patient == null) {
      throw new HttpResponseError(
        404,
        "NOT_FOUND",
        "Patient ID " + req.params["patientId"] + " not found"
      );
    }

    await patientsService.updatePatientById(
      req.params["patientId"],
      partialPatient
    );

    // After the patient is updated, we can call handleGetPatientById
    return this.handleGetPatientById(req, res, next, (data) =>
      PatientClientModel.fromEntity(data).toBodyPublicPatient()
    );
  };
}

