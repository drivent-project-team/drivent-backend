import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import dayjs from "dayjs";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createUser } from "../factories";
import { createActivity, createPlace, createUserActivity } from "../factories/activities-factory";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /activities", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activities");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and activities data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const place = await createPlace();
      const createdActivity = await createActivity(place.id, "09:00", "10:00");
      const createdUserActivity = await createUserActivity(user.id, createdActivity.id);

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        activities: [
          {
            id: createdActivity.id,
            name: createdActivity.name,
            placeId: createdActivity.placeId,
            date: createdActivity.date.toISOString(),
            startAt: createdActivity.startAt,
            endsAt: createdActivity.endsAt,
            capacity: createdActivity.capacity,
            createdAt: createdActivity.createdAt.toISOString(),
            updatedAt: createdActivity.updatedAt.toISOString(),
            Place: {
              ...place,
              createdAt: place.createdAt.toISOString(),
              updatedAt: place.updatedAt.toISOString(),
            },
            _count: {
              userActivity: 1,
            },
          },
        ],
        eventDates: [dayjs(createdActivity.date).locale("pt-br").format("dddd, D/MM")],
      });
    });
  });
});

describe("GET /activities/:date", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activities/0");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activities/0").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activities/0").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and activities data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const place = await createPlace();
      const createdActivity = await createActivity(place.id, "09:00", "10:00");

      const response = await server
        .get(`/activities/${createdActivity.date.toISOString()}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: createdActivity.id,
          name: createdActivity.name,
          placeId: createdActivity.placeId,
          date: createdActivity.date.toISOString(),
          startAt: createdActivity.startAt,
          endsAt: createdActivity.endsAt,
          capacity: createdActivity.capacity,
          createdAt: createdActivity.createdAt.toISOString(),
          updatedAt: createdActivity.updatedAt.toISOString(),
        },
      ]);
    });
  });
});

describe("GET /activities/places", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activities/places");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activities/places").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activities/places").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and activities data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const place = await createPlace();

      const response = await server.get("/activities/places").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: place.id,
          name: place.name,
          createdAt: place.createdAt.toISOString(),
          updatedAt: place.updatedAt.toISOString(),
        },
      ]);
    });
  });
});

describe("POST /activities", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/activities");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 if body param activityId is missing", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const place = await createPlace();
      const createdActivity = await createActivity(place.id, "09:00", "10:00");

      const response = await server.post("/activities").set("Authorization", `Bearer ${token}`).send({});

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 201 and insert a new userActivity in the database", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const place = await createPlace();
      const createdActivity = await createActivity(place.id, "09:00", "10:00");
      const body = { activityId: createdActivity.id };

      const response = await server.post("/activities").set("Authorization", `Bearer ${token}`).send(body);
      const createdUserActivity = await prisma.userActivity.findFirst({
        where: {
          userId: user.id,
          activityId: createdActivity.id,
        },
      });

      expect(response.status).toBe(httpStatus.CREATED);
      expect(createdUserActivity).toBeDefined();
    });

    it("should respond with status 201 when non-conflicting new activity time", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const place = await createPlace();
      const createdActivity1 = await createActivity(place.id, "09:00", "10:00");
      const createdActivity2 = await createActivity(place.id, "10:00", "11:00");
      const body1 = { activityId: createdActivity1.id };
      const body2 = { activityId: createdActivity2.id };

      await server.post("/activities").set("Authorization", `Bearer ${token}`).send(body1);
      const response = await server.post("/activities").set("Authorization", `Bearer ${token}`).send(body2);
      const createdUserActivity = await prisma.userActivity.findFirst({
        where: {
          userId: user.id,
          activityId: createdActivity2.id,
        },
      });

      expect(response.status).toBe(httpStatus.CREATED);
      expect(createdUserActivity).toBeDefined();
    });
  });
});
