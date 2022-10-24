import { Payload } from "../payload";
import { TicketStatus } from "./ticket-status";

export class TicketStatusPayload extends Payload {
  declare public data: TicketStatus[];
}