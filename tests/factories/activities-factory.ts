import { prisma } from '@/config';
import faker from '@faker-js/faker';

export async function createPlace() {
  return await prisma.place.create({
    data: {
      name: faker.address.county(),
    },
  });
}

export async function createActivity(placeId: number, startAt: string, endsAt: string) {
  return await prisma.activity.create({
    data: {
      capacity: Number(faker.random.numeric()),
      name: faker.lorem.words(),
      date: faker.datatype.datetime(),
      startAt,
      endsAt,
      placeId,
    },
  });
}

export function mockActivity(startAt: string, endsAt: string) {
  return {
    id: faker.datatype.number({ min: 1 }),
    capacity: faker.datatype.number({ min: 1 }),
    name: faker.lorem.words(),
    date: '2023-03-15',
    startAt,
    endsAt,
    placeId: faker.datatype.number({ min: 1 }),
  }
}

export async function createUserActivity(userId: number, activityId: number) {
  return await prisma.userActivity.create({
    data: {
      userId,
      activityId,
    },
  });
}