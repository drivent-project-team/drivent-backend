import app, { init } from '@/app';
import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { createEnrollmentWithAddress, createUser } from '../factories';
import { createActivity, createPlace } from '../factories/activities-factory';
import { cleanDb, generateValidToken } from '../helpers';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /activities', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activities');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and activities data', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const place = await createPlace();
      const createdActivity = await createActivity(place.id);

      const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        activities: [
          {
            id: createdActivity.id,
            name: createdActivity.name,
            placeId: createdActivity.placeId,
            date: createdActivity.date.toISOString(),
            startAt: createdActivity.startAt,
            endsAt: createdActivity.endsAt,
            capacity: createdActivity.capacity,
            createdAt: createdActivity.createdAt.toISOString(),
            updatedAt: createdActivity.updatedAt.toISOString(),
            Place: {
              ...place,
              createdAt: place.createdAt.toISOString(),
              updatedAt: place.updatedAt.toISOString(),
            },
          },
        ],
        eventDates: [dayjs(createdActivity.date).locale('pt-br').format('dddd, D/MM')],
      });
    });
  });
});

describe('GET /activities/:date', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activities/0');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activities/0').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activities/0').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and activities data', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const place = await createPlace();
      const createdActivity = await createActivity(place.id);

      const response = await server
        .get(`/activities/${createdActivity.date.toISOString()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: createdActivity.id,
          name: createdActivity.name,
          placeId: createdActivity.placeId,
          date: createdActivity.date.toISOString(),
          startAt: createdActivity.startAt,
          endsAt: createdActivity.endsAt,
          capacity: createdActivity.capacity,
          createdAt: createdActivity.createdAt.toISOString(),
          updatedAt: createdActivity.updatedAt.toISOString(),
        },
      ]);
    });
  });
});
