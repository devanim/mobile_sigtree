import { Payload } from "../payload";
import { UserProfile } from "./user-profile";

export class UserProfilePayload extends Payload {
  declare public data: UserProfile;
}