import { prisma } from "@/config";

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

const activitiesRepository = {
  findActivitiesWithPlaces,
  getPlaces,
};
  
export default activitiesRepository;
