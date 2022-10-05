export class UserProfile {
  public lang!: string;
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public email!: string;
  public phoneNumber!: string;
  public notifyOnNewNote!: boolean;
  public notifyOnStatusNew!: boolean;
  public notifyOnStatusProgress!: boolean;
  public notifyOnStatusPending!: boolean;
  public notifyOnStatusResolved!: boolean;
  public notifyOnStatusClosed!: boolean;
  public notifyOnMyTicketsOnly!: boolean;
  public allowNewsletters!: boolean;
  public notifyOnNewDocument!: boolean;
  public role!: number;
  public defaultBuildingId!: number;
}