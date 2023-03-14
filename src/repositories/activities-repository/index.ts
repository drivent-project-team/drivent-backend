import { prisma } from '@/config';

async function findDatesByEventId(eventId: number) {
    return prisma.activity.findMany({
      where: {
        id: eventId,
      },
      include: {
        Place: true,
      }
    });
  }
  

const activitiesRepository = {
    findDatesByEventId
  };
  
  export default activitiesRepository;
  