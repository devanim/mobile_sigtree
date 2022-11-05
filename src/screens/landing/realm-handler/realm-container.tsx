import { Button, Layout } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { realmHandlerStyles } from "./realm-container-styles";
import RealmSelector, {
  BarcodeReadPayload,
} from "../../../components/realm-selector/realm-selector";
import RealmList from "./realm-list";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import RealmDetails from "../../../models/realm-details";
import RealmContext from "../../../context/RealmContext";
import { APP_LANGUAGE_KEY, REALMS_KEY } from "../../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../../routing/route-screens";
import LocalizationContext from "../../../localization/localization-context";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import axios from "axios";
import { UserProfilePayload } from "../../../models/user-profile/user-profile-payload";
import { DEFAULT_LANGUAGE } from "../../../localization/i18n";
import { registerForPushNotificationsAsync } from "../../../utils/notificationsUtils";

const RealmContainer = (): JSX.Element => {
  const { ready, login, realm, token: authorizationToken } = useKeycloak();
  const [showRealmSelector, setShowRealmSelector] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const { realmData: realmData, setRealm } = useContext(RealmContext);
  const [storedRealms, setStoredRealms] = useState<RealmDetails[]>([]);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const { t, locale, handleChange } = useContext(LocalizationContext);

  useEffect(() => {
    AsyncStorage.getItem(REALMS_KEY).then((value) => {
      if (!value) {
        setStoredRealms([]);
        return;
      }

      const parsed: RealmDetails[] = JSON.parse(value);
      setStoredRealms(parsed);
    });
  }, []);

  const resetRealmSelectorComponent = () => {
    setShowRealmSelector(false);
  };

  const onRealmSelectedCallback = (realmDetails: RealmDetails) => {
    setRealm(realmDetails);
    onLogin();
  };

  const onRemoveRealmCallback = (realmName: string) => {
    const newRealms = storedRealms.filter(
      (realm: RealmDetails) => realm.name !== realmName
    );

    setStoredRealms(newRealms);
    AsyncStorage.setItem(REALMS_KEY, JSON.stringify(newRealms));
  };

  const onBarcodeReadCallback = (payload: BarcodeReadPayload): void => {
    const parsedRealmDetails = new RealmDetails(payload.data);

    if (!parsedRealmDetails.sucesfullyParsed) {
      alert(`Error: ${parsedRealmDetails.parsingError}`);
      return;
    }

    if (containsKey(parsedRealmDetails.name)) {
      alert(
        `Realm ${parsedRealmDetails.name} is already configured on this device`
      );
      return;
    }

    const currentRealms = storedRealms;
    currentRealms.push(parsedRealmDetails);

    setStoredRealms(currentRealms);
    AsyncStorage.setItem(REALMS_KEY, JSON.stringify(currentRealms));

    setShowRealmSelector(false);
  };

  const containsKey = (key: string): boolean => {
    const existingKey = storedRealms.find((item) => item.name === key);

    if (existingKey) {
      return true;
    } else {
      return false;
    }
  };

  const onLogin = async () => {
    await login();
    setTimeout(() => { }, 500);
    await setLanguage();
    await initializeNotifiations();
    navigate("DashboardNavigator", { screen: "DashboardScreen" });
  };

  const setLanguage = async () => {
    try {
      const response = await axios.get<UserProfilePayload>(
        SigtreeConfiguration.getUrl(realm, SCREEN_URL.USER_PROFILE_URL),
        { headers: { Authorization: `Bearer ${authorizationToken}` } }
      );

      if (response.status == 200) {
        const language = response.data.data.lang;
        if (language.length > 0) {
          handleChange(language);
          AsyncStorage.setItem(APP_LANGUAGE_KEY, language);
        } else {
          handleChange(DEFAULT_LANGUAGE);
        }
      }
    } catch (error) { }
  };

  const initializeNotifiations = async () => {
    registerForPushNotificationsAsync().then(async (device) => {
      if(device?.token != null){
        await axios.post(
          SigtreeConfiguration.getUrl(realm, SCREEN_URL.DEVICES),
          {
            "deviceid": device?.token,
            "platform": device?.platform
          },
          { headers: { Authorization: `Bearer ${authorizationToken}` } }
        );
        return setExpoPushToken(device?.token as string);
      }
    });
  }

  const toggleRealmSelectorComponent = () => {
    if (showRealmSelector === true) {
      return (
        <RealmSelector
          onDataRead={onBarcodeReadCallback}
          onCancel={resetRealmSelectorComponent}
        />
      );
    }

    if (storedRealms.length == 1) {
      return (
        <Button
          style={realmHandlerStyles.button}
          children={t("LOGIN_BTN")}
          onPress={onLogin}
          size={"small"}
        />
      );
    }

    return (
      <RealmList
        storedRealms={storedRealms}
        onRealmSelected={onRealmSelectedCallback}
        onRemoveRealm={onRemoveRealmCallback}
      />
    );
  };

  if (!ready) return <ActivityIndicator />;

  return (
    <Layout style={styles.container} level='1'>
      <Button
        style={realmHandlerStyles.button}
        children={"Add new realm"}
        onPress={() => setShowRealmSelector(true)}
        size={"small"}
      />
      <Button
        style={realmHandlerStyles.button}
        children={"Login with default realm"}
        onPress={onLogin}
        size={"small"}
      />
      {toggleRealmSelectorComponent()}
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: "10%",
  }
});

export default RealmContainer;
