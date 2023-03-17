import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createPlace() {
  return await prisma.place.create(
    {
      data: {
        name: faker.address.county()
      }
    }
  );
}

export async function createActivity(placeId: number) {
  return await prisma.activity.create(
    {
      data: {
        capacity: Number(faker.random.numeric()),
        name: faker.lorem.words(),
        date: faker.datatype.datetime(),
        startAt: "",
        endsAt: "",
        placeId
      }
    }
  );
}
