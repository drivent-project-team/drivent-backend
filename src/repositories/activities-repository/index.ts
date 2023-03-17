import { prisma } from "@/config";
import dayjs from "dayjs";


async function findActivitiesWithPlaces() {
  return prisma.activity.findMany({
    include: {
      Place: true,
    },
  });
}

async function getPlaces() {
  return prisma.place.findMany();
}

async function findActivitiesByDate(date: string) {
  const dateFormat = new Date(date);

  return prisma.activity.findMany({
    where: {
      date: dateFormat,
    },
  });
}

async function create(userId: number, activityId: number) {
  return prisma.userActivity.create({
    data: {
      userId,
      activityId
    }
  });
}

async function findActivityById(id: number) {
  return prisma.activity.findFirst({
    where: {
      id
    }
  });
}

async function findActivitiesByUserId(userId: number) {
  return prisma.userActivity.findMany({
    where: {
      userId
    },
    include: {
      Activity: true
    }
  });
}

const activitiesRepository = {
  findActivitiesWithPlaces,
  getPlaces,
  findActivitiesByDate,
   create,
  findActivityById,
  findActivitiesByUserId,
};

export default activitiesRepository;
