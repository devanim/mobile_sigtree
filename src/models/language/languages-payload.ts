import { Payload } from "../payload";
import { Language } from "./language";

export class LanguagesPayload extends Payload {
  declare public data: Language[];
}