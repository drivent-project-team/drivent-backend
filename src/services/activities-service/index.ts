import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getEventActivities() {
  const dates = await activitiesRepository.findActivitiesWithPlaces();

  if (dates.length === 0) {
    throw notFoundError();
  }
  return dates;
}

async function getPlaces() {
  const places = await activitiesRepository.getPlaces();
  if(!places) {
    throw notFoundError();
  }
  return places;
}

const activitiesService = {
  getEventActivities,
  getPlaces,
};

export default activitiesService;
