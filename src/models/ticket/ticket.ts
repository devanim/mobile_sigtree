export class Ticket {
  public id!: number;
  public idtracking: number | null = null;
  public idscheduler!: number;
  public name!: string;
  public tags!: string;
  public tagsArray!: string[];
  public idcategory!: number;
  public category!: string;
  public attachmentsArray!: TicketAttachment[];
  public idstatus!: number;
  public statusKey!: string;
  public idpriority!: number;
  public priorityKey!: string;
  public iduser!: number;
  public user!: string;
  public idproject!: number;
  public project!: string;
  public idbuilding!: number;
  public building!: string;
  public idsupplier!: number;
  public supplier!: string;
  public floor!: string;
  public idtenant!: number;
  public tenant!: string;
  public rating!: number;
  public content!: string;
  public slaupdatesbreach!: number;
  public timestamp!: string;
  public timestampClosure!: string;
  public timestampResolution!: string;
  public timestampResolutionSLA!: string;
  public timestampFirstResponse!: string;
  public timestampFirstResponseSLA!: string;
  public canClose!: number;
  public idapproval!: number;
  public approvalKey!: string;
}

export type TicketAttachment = {
  name: string;
  url: string;
  data: string;
}