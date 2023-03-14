import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';
import { Response } from 'express';
import httpStatus from 'http-status';


export async function listDates(req: AuthenticatedRequest, res: Response) {
    try {
    const {eventId} = req.body.eventId;
      const dates = await activitiesService.getEventDates(eventId);
      console.log(dates)
      return res.status(httpStatus.OK).send({
        dates
      });
    } catch (error) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
  