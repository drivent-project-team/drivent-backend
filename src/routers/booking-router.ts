import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, getNumBookingsByRoom } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("", listBooking)
  .post("", bookingRoom)
  .put("/:bookingId", changeBooking)
  .get("/count", getNumBookingsByRoom);

export { bookingRouter };
