import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivities, getPlaces, getActivitiesByDate, postActivity, getUserActivities } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .get("/places", getPlaces)
  .get("/userActivities", getUserActivities)
  .get("/:date", getActivitiesByDate)
  .post("/", postActivity);

export { activitiesRouter };
