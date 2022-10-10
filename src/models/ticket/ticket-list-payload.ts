import { Payload } from "../payload";
import { TicketBrief } from "./ticket-brief";

export class TicketListPayload extends Payload {
  declare public data: TicketListPayloadData;
}

class TicketListPayloadData {
  public tickets: TicketBrief[] | undefined;
  public more!: boolean;
}