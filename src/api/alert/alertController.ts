import type { Request, RequestHandler, Response } from "express";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { Alert } from "./alertModel";
import path from "path";
import { getDatabase } from "@/database";

const dbFilePath = path.join(process.cwd(), "src/database/db.json");

class AlertController {
  public addAlert: RequestHandler = async (req: Request, res: Response) => {
    try {
      const db = getDatabase();

      const alert: Alert = {
        type: req.body.type,
        description: req.body.description,
        website_url: req.body.website_url,
      };

      const result = await db.run(
        `INSERT INTO alerts (website_url, type, description)
         VALUES (?, ?, ?)`,
        [alert.website_url, alert.type, alert.description]
      );

      const serviceResponse = {
        success: true,
        message: "alert save successfully",
        responseObject: null,
        statusCode: 200,
      };

      return handleServiceResponse(serviceResponse, res);
    } catch (error) {}
  };
}

export const alertController = new AlertController();
