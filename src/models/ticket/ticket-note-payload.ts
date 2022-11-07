import { Payload } from "../payload";
import { TicketNote } from "./ticket-note";

export class TicketNotePayload extends Payload {
  declare public data: TicketNotePayloadData;
}

class TicketNotePayloadData {
  public notes: TicketNote[] | undefined;
  public more!: boolean;
}