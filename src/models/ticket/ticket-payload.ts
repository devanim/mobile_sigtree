import { Payload } from "../payload";
import { Ticket } from "./ticket";

export class TicketPayload extends Payload {
  declare public data: Ticket;
}