import AsyncStorage from "@react-native-async-storage/async-storage";
import RealmDetails from "./realm-details";
import { REALMS_KEY } from "../utils/constants";

export class RealmStorage {
  public storedRealms: RealmDetails[] = [];

  public saveRealm = (value: RealmDetails): void => {
    AsyncStorage.getItem(REALMS_KEY).then((realmValues) => {
      if (!realmValues) {
        this.storedRealms = [];
        return;
      }

      this.storedRealms = JSON.parse(realmValues);
      this.storedRealms.push(value);

      AsyncStorage.setItem(REALMS_KEY, JSON.stringify(this.storedRealms));
    });
  }

  public containsKey = (key: string): boolean => {
    alert(`storage realms ${this.storedRealms.length}`);
    const existingKey = this.storedRealms.find(item => item.name === key);

    if (existingKey) {
      return true;
    } else {
      return false;
    }
  }
}