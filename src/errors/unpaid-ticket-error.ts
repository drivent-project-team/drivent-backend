import { ApplicationError } from "@/protocols";

export function unpaidTicketError(): ApplicationError {
  return {
    name: "UnpaidTicketError",
    message: "You must pay your ticket to join an activity",
  };
}
