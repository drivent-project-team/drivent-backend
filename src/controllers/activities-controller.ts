import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';
import { Response } from 'express';
import httpStatus from 'http-status';


export async function listActivities(req: AuthenticatedRequest, res: Response) {
    try {
      const dates = await activitiesService.getEventActivities();
      return res.status(httpStatus.OK).send({
        dates
      });
    } catch (error) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
  