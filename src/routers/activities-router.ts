import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivities, getPlaces } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .get("/places", getPlaces);
  
export { activitiesRouter };
