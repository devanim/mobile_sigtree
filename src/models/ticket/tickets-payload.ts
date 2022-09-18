import { TicketBrief } from "./ticket-brief";

export class TicketsPayload {
  public status!: string;
  public message!: string;
  public data: TicketBrief[] | undefined;
  public error = "";
}