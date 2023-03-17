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
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }
  
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);  
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.status !== "PAID") {
    throw unpaidTicketError();
  }
  
  const activity = await activitiesRepository.findActivityById(activityId);
  if (!activity) {
    throw notFoundError();
  }  
  
  const activityStart = activity.startAt.split(":");
  const activityEnd = activity.endsAt.split(":");

  const userActivities = await activitiesRepository.findActivitiesByUserId(userId);

  userActivities.forEach((userActivity) => {
    if (userActivity.activityId === activityId) {
      throw conflictError("You already joined this activity");
    }
    const start = userActivity.Activity.startAt;
    const startHours = start.split(":");

    const end = userActivity.Activity.endsAt;
    const endHours = end.split(":");

    if(Number(startHours[0]) >= Number(activityEnd[0]) || Number(activityStart[0]) >= Number(endHours[0])) {
      console.log("SEM CONFLITO");
    } else {
      console.log("CONFLITO");
      throw conflictError("You already have an activity at this date");
    }
  });

  return activitiesRepository.create(userId, activityId);
}

const activitiesService = {
  getEventActivities,
  getPlaces,
  getActivitiesByDate,
  postActivity,
};


export default activitiesService;
