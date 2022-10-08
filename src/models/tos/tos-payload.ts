import { Payload } from "../payload";
import { TOS } from "./tos";

export class TOSPayload extends Payload {
  declare public data: TOS[];
}