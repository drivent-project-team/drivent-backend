import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivities, postActivity } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .post("/", postActivity);  

export { activitiesRouter };
