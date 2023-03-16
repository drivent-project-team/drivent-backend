import { prisma } from '@/config';
import faker from '@faker-js/faker';

export async function createPlace() {
  return prisma.place.create({
    data: {
      name: faker.datatype.string(),
    },
  });
}

export async function createActivity(placeId: number) {
  return prisma.activity.create({
    data: {
      name: faker.datatype.string(),
      placeId,
      date: faker.date.soon(),
      startAt: faker.datatype.string(),
      endsAt: faker.datatype.string(),
      capacity: faker.datatype.number({ min: 1, max: 200 }),
    },
  });
}
