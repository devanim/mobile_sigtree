import AsyncStorage from "@react-native-async-storage/async-storage";
import RealmDetails from "../realm-selector/realm-details";
import { REALMS_KEY } from "../utils/constants";

export class RealmStorage {
  public storedRealms: RealmDetails[] = [];

  public readStoredRealms = (): void => {
    AsyncStorage.getItem(REALMS_KEY).then((value) => {
      if (!value) {
        alert(`Key ${REALMS_KEY} could not be read from async storage`);
        return;
      }
      
      this.storedRealms = JSON.parse(value);
    });
  }

  public saveRealm = (value: RealmDetails): void => {
    this.storedRealms.push(value);
    AsyncStorage.setItem(REALMS_KEY, JSON.stringify(this.storedRealms));
  }

  public containsKey = (key: string): boolean => {
    const existingKey = this.storedRealms.find(item => item.keycloakUrl === key);

    if (existingKey) {
      return true;
    } else {
      return false;
    }
  }
}