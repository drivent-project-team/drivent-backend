import { prisma } from "@/config";

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

const activitiesRepository = {
  findActivitiesWithPlaces,
  getPlaces,
};
  
export default activitiesRepository;
