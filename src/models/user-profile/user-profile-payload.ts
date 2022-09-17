import { UserProfile } from "./user-profile";

export class UserProfilePayload {
  public status!: string;
  public message!: string;
  public data!: UserProfile;
  public error = "";
}