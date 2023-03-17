import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { Response } from "express";
import httpStatus from "http-status";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesService.getEventActivities();
    const eventDates = [...new Set(activities.map((activity) => dayjs(activity.date).locale("pt-br").format("dddd, D/MM")))];
    return res.status(httpStatus.OK).send({ activities, eventDates });
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postActivity(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.body;

  if(!activityId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  
  try {
    await activitiesService.postActivity(Number(userId), Number(activityId));
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error.name === "UnpaidTicketError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    } else {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
