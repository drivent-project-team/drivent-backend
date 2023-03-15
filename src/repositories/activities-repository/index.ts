import { prisma } from '@/config';

async function findActivitiesWithPlaces() {
  return prisma.activity.findMany({
    include: {
      Place: true,
    },
  });
}


const activitiesRepository = {
    findActivitiesWithPlaces
  };
  
  export default activitiesRepository;
  