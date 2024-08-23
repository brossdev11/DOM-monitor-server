import express, { type Router } from "express";

import { alertController } from "./alertController";

export const alertRouter: Router = express.Router();

alertRouter.post("/", alertController.addAlert);
