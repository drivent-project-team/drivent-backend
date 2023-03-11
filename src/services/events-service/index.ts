import { notFoundError } from "@/errors";
import eventRepository from "@/repositories/event-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event } from "@prisma/client";
import dayjs from "dayjs";
import { createClient } from "redis";

async function getFirstEvent(): Promise<GetFirstEventResult> {
  const redis = createClient({
    url: "redis://localhost:6379"
  });
  await redis.connect();
  const cacheEvent = await redis.get("event");
  console.log(cacheEvent);

  if (cacheEvent) {
    return JSON.parse(cacheEvent);
  } else {
    const event = await eventRepository.findFirst();
    if (!event) throw notFoundError();
    redis.set("event", JSON.stringify(event));

    return exclude(event, "createdAt", "updatedAt");
  }
}

export type GetFirstEventResult = Omit<Event, "createdAt" | "updatedAt">;

async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
};

export default eventsService;
