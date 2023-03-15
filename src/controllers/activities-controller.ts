import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';
import { Response } from 'express';
import httpStatus from 'http-status';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesService.getEventActivities();
    const eventDates = [...new Set(activities.map((activity) => dayjs(activity.date).locale('pt-br').format('dddd, D/MM')))];
    return res.status(httpStatus.OK).send({ activities, eventDates });
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
