import { Request } from "express";
import { userPayload } from "./userPayLoad";

export interface userRequest extends Request {
    userData?: userPayload;
}