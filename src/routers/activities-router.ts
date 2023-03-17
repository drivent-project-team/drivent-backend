import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { listActivities, getPlaces, getActivitiesByDate } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('', listActivities)
  .get('/places', getPlaces)
  .get('/:date', getActivitiesByDate);

export { activitiesRouter };
