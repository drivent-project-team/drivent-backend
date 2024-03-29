import { conflictError, notFoundError, unpaidTicketError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

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

async function postActivity(userId: number, activityId: number) {
  const activity = await activitiesRepository.findActivityById(activityId);
  if (!activity) {
    throw notFoundError();
  }  
  
  const activityStart = activity.startAt.split(":")[0] + activity.startAt.split(":")[1];
  const activityEnd = activity.endsAt.split(":")[0] + activity.endsAt.split(":")[1];

  const userActivities = await activitiesRepository.findUserActivitiesByUserId(userId);
  const userActivitiesByDate = userActivities.filter((a) => a.Activity.date === activity.date);

  userActivitiesByDate.forEach((userActivity) => {
    if (userActivity.activityId === activityId) {
      throw conflictError("You already joined this activity!");
    }
    const start = userActivity.Activity.startAt;
    const startHours = start.split(":")[0] + start.split(":")[1];

    const end = userActivity.Activity.endsAt;
    const endHours = end.split(":")[0] + end.split(":")[1];

    if(Number(startHours) >= Number(activityEnd) || Number(activityStart) >= Number(endHours)) {
      console.log("SEM CONFLITO");
    } else {
      console.log("CONFLITO");
      throw conflictError("You already have an activity at this time!");
    }
  });

  return activitiesRepository.create(userId, activityId);
}

async function getUserActivities( userId: number)  {
  const userActivities = await activitiesRepository.findUserActivitiesByUserId(userId);
  if(!userActivities) {
    throw notFoundError();
  }
  return userActivities.map((a) => a.activityId);
}

const activitiesService = {
  getEventActivities,
  getPlaces,
  getActivitiesByDate,
  postActivity,
  getUserActivities,
};

export default activitiesService;
