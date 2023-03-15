import { notFoundError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";

async function getEventActivities() {
    const dates = await activitiesRepository.findActivitiesWithPlaces();
    if (!dates) {
      throw notFoundError();
    }
    return dates;
  }


  const activitiesService = {
    getEventActivities
  };
  
  export default activitiesService;