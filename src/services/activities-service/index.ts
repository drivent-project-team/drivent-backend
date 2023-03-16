import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getEventActivities() {
  const dates = await activitiesRepository.findActivitiesWithPlaces();
  if (dates.length === 0) {
    throw notFoundError();
  }
  return dates;
}

const activitiesService = {
  getEventActivities,
};

export default activitiesService;
