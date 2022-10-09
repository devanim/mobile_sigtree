import { Payload } from "../payload";
import { BuildingTos } from "./building-tos";

export class TOSPayload extends Payload {
  declare public data: BuildingTos[];
}