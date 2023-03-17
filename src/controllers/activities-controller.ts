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

export async function getPlaces(req: AuthenticatedRequest, res: Response) {
  try {
    const places = await activitiesService.getPlaces();
    return res.status(httpStatus.OK).send(places);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getActivitiesByDate(req: AuthenticatedRequest, res: Response) {
  const { date } = req.params;
  try {
    const activities = await activitiesService.getActivitiesByDate(date);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

