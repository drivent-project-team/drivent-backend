import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listDates } from "@/controllers";


const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listDates)
  

export { activitiesRouter };
