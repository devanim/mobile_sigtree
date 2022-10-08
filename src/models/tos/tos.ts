import { parse } from "react-native-svg";
import { ResponseStatus } from "src/utils/response-status-enum";

export class TOS {
  public status: ResponseStatus;
  public message: string;
  public data: TosData[];

  constructor(payload: string) {
    const parsedPayload: any = JSON.parse(payload);

    this.status = parsedPayload.status;
    this.message = parsedPayload.message;
    this.data = [];

    parsedPayload.foreach((item: any) => this.data.push(new TosData(item.name, item.url)))
  }
}

class TosData {
  public name: string;
  public url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}