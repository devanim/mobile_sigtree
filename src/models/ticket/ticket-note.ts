import { Attachment } from "../attachment"

export class TicketNote {
  public id!: number;
  public type!: string;
  public username!: string;
  public role!: string;
  public timestamp!: string;
  public content!: string;
  public internalForTypes!: number[];
  public attachments!: TicketNoteAttachment[];
}

class TicketNoteAttachment extends Attachment {
  public data!: string;
}

