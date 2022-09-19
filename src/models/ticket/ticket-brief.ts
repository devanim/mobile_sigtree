export class TicketBrief {
  public id!: string;
  public idtracking: number | null = null;
  public idscheduler!: number;
  public name!: string;
  public tags!: string;
  public category!: string;
  public statusKey!: string;
  public priorityKey!: string;
  public user!: string;
  public project!: string;
  public building!: string;
  public supplier!: string;
  public floor!: string;
  public tenant!: string;
  public timestamp!: string;
  public approvalKey!: string;

  public getDateFromTimeStamp = (): string => {
    const date = new Date(this.timestamp);

    return date.toISOString();
  }
}