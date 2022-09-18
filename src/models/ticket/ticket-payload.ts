import { Ticket } from "./ticket";

export class TicketPayload {
  public status!: string;
  public message!: string;
  public data: Ticket | undefined;
  public error = "";
}