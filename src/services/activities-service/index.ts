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
  if (places.length === 0) {
    throw notFoundError();
  }
  return places;
}

async function getActivitiesByDate(date: string) {
  const activities = await activitiesRepository.findActivitiesByDate(date);

  if (activities.length === 0) {
    throw notFoundError();
  }

  return activities;
}

const activitiesService = {
  getEventActivities,
  getPlaces,
  getActivitiesByDate,
};

export default activitiesService;
