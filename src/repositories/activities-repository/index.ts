import { prisma } from "@/config";

async function findActivitiesWithPlaces() {
  return prisma.activity.findMany({
    include: {
      Place: true,
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
  create,
  findActivityById,
  findActivitiesByUserId
};

export default activitiesRepository;
