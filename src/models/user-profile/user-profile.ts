import { BaseData } from "../payload";
import { Building } from "./building";
import { Project } from "./project";
import { Tenant } from "./tenant";

export class UserProfile implements BaseData {
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
  public buildings!: Building[];
  public tenants!: Tenant[];
  public projects!: Project[];
}