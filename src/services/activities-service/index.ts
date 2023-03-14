import { notFoundError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";

async function getEventDates(eventId: number) {
    const dates = await activitiesRepository.findDatesByEventId(eventId);
    if (!dates) {
      throw notFoundError();
    }
    return dates;
  }


  const activitiesService = {
    getEventDates
  };
  
  export default activitiesService;