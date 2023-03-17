import { init } from '@/app';
import activitiesService from '@/services/activities-service';
import dayjs from 'dayjs';
import { cleanDb } from '../helpers';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

describe('getEventActivities', () => {
  it('should respond with status 404 when there are no activities', async () => {
    try {
      await activitiesService.getEventActivities();
    } catch (error) {
      expect(error).toEqual({
        name: 'NotFoundError',
        message: 'No result for this search!',
      });
    }
  });
});

describe('getActivitiesByDate', () => {
  it('should respond with status 404 when there are no activities', async () => {
    try {
      const date = dayjs().toDate().toISOString();
      await activitiesService.getActivitiesByDate(date);
    } catch (error) {
      expect(error).toEqual({
        name: 'NotFoundError',
        message: 'No result for this search!',
      });
    }
  });
});
