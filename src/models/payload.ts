import { ResponseStatus } from "src/utils/response-status-enum";

export interface BaseData {}

export class Payload {
  public status!: ResponseStatus;
  public message!: string;
  public data?: BaseData;
}