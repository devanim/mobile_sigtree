import { TicketBrief } from "./ticket-brief";

export class TicketListPayload {
  public status!: string;
  public message!: string;
  public data: TicketListPayloadData | undefined;
  public error = "";
}

class TicketListPayloadData {
  public tickets: TicketBrief[] | undefined;
  public more!: boolean;
}