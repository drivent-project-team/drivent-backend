import { prisma } from '@/config';
import dayjs from 'dayjs';

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

const activitiesRepository = {
  findActivitiesWithPlaces,
  getPlaces,
  findActivitiesByDate,
};

export default activitiesRepository;
