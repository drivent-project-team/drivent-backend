import { prisma } from "@/config";
import dayjs from "dayjs";

async function findActivitiesWithPlaces() {
  return prisma.activity.findMany({
    include: {
      Place: true,
      _count: {
        select: { userActivity: true },
      }
    },
    orderBy: {
      id: "asc",
    }
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

async function findUserActivitiesByUserId(userId: number) {
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
  findUserActivitiesByUserId,
};

export default activitiesRepository;
