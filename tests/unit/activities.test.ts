import { init } from '@/app';
import activitiesRepository from '@/repositories/activities-repository';
import activitiesService from '@/services/activities-service';
import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import { mockActivity } from '../factories/activities-factory';
import { cleanDb } from '../helpers';

describe('getEventActivities', () => {
  it('throw an NotFoundError when there are no activities', async () => {
    jest.spyOn(activitiesRepository, 'findActivitiesWithPlaces').mockImplementationOnce((): any => []);
    const promise = activitiesService.getEventActivities();

    expect(promise).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });
});

describe('getActivitiesByDate', () => {
  it('throw an NotFoundError when there are no activities', async () => {
    jest.spyOn(activitiesRepository, 'findActivitiesByDate').mockImplementationOnce((): any => []);
    const date = dayjs().toDate().toISOString();
    const promise = activitiesService.getActivitiesByDate(date);

    expect(promise).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });
});

describe('getPlaces', () => {
  it('throw an NotFoundError when there are no activities', async () => {
    jest.spyOn(activitiesRepository, 'getPlaces').mockImplementationOnce((): any => []);
    const promise = activitiesService.getPlaces();

    expect(promise).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });
});

describe('postActivity', () => {
  it('throw an NotFoundError when activity does not exist', async () => {
    jest.spyOn(activitiesRepository, 'findActivityById').mockImplementationOnce((): any => null);
    const promise = activitiesService.postActivity(
      faker.datatype.number({ min: 1 }),
      faker.datatype.number({ min: 1 }),
    );

    expect(promise).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });

  it('throw an ConflictError when user already has an activity subscription', async () => {
    const mockedActivity = mockActivity('09:00', '10:00');
    const userId = faker.datatype.number({ min: 1 });
    const mockedUserActivities = [
      {
        id: faker.datatype.number({ min: 1 }),
        userId,
        activityId: mockedActivity.id,
        Activity: mockedActivity,
      },
    ];
    jest.spyOn(activitiesRepository, 'findActivityById').mockImplementationOnce((): any => mockedActivity);
    jest.spyOn(activitiesRepository, 'findActivitiesByUserId').mockImplementationOnce((): any => mockedUserActivities);

    const promise = activitiesService.postActivity(userId, mockedUserActivities[0].activityId);

    expect(promise).rejects.toEqual({
      name: 'ConflictError',
      message: 'You already joined this activity!',
    });
  });

  it('throw an ConflictError when there is a time conflict of activities: case 1', async () => {
    const mockedActivity = mockActivity('09:00', '10:00');
    const mockedNewActivity = mockActivity('09:30', '11:00');
    const userId = faker.datatype.number({ min: 1 });
    const mockedUserActivities = [
      {
        id: faker.datatype.number({ min: 1 }),
        userId,
        activityId: mockedActivity.id,
        Activity: mockedActivity,
      },
    ];
    jest.spyOn(activitiesRepository, 'findActivityById').mockImplementationOnce((): any => mockedNewActivity);
    jest.spyOn(activitiesRepository, 'findActivitiesByUserId').mockImplementationOnce((): any => mockedUserActivities);

    const promise = activitiesService.postActivity(userId, mockedNewActivity.id);

    expect(promise).rejects.toEqual({
      name: 'ConflictError',
      message: 'You already have an activity at this time!',
    });
  });

  it('throw an ConflictError when there is a time conflict of activities: case 2', async () => {
    const mockedActivity = mockActivity('09:00', '10:00');
    const mockedNewActivity = mockActivity('08:00', '09:30');
    const userId = faker.datatype.number({ min: 1 });
    const mockedUserActivities = [
      {
        id: faker.datatype.number({ min: 1 }),
        userId,
        activityId: mockedActivity.id,
        Activity: mockedActivity,
      },
    ];
    jest.spyOn(activitiesRepository, 'findActivityById').mockImplementationOnce((): any => mockedNewActivity);
    jest.spyOn(activitiesRepository, 'findActivitiesByUserId').mockImplementationOnce((): any => mockedUserActivities);

    const promise = activitiesService.postActivity(userId, mockedNewActivity.id);

    expect(promise).rejects.toEqual({
      name: 'ConflictError',
      message: 'You already have an activity at this time!',
    });
  });
});
