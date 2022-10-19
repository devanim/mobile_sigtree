import { Button } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";

import Text from "../../../components/text";
import { realmHandlerStyles } from "./realm-container-styles";
import RealmSelector, {
  BarcodeReadPayload,
} from "../../../components/realm-selector/realm-selector";
import RealmList from "./realm-list";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import RealmDetails from "../../../models/realm-details";
import RealmContext from "../../../context/RealmContext";
import { REALMS_KEY } from "../../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../../routing/route-screens";
import LocalizationContext from "../../../localization/localization-context";

const RealmContainer = (): JSX.Element => {
  const { ready, login } = useKeycloak();
  const [showRealmSelector, setShowRealmSelector] = useState(false);
  const { realmData: realmData, setRealm } = useContext(RealmContext);
  const [storedRealms, setStoredRealms] = useState<RealmDetails[]>([]);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const { t, handleChange } = useContext(LocalizationContext);

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
    setTimeout(() => {}, 500);
    handleChange("ro");
    navigate("DashboardNavigator", { screen: "DashboardScreen" });
  };

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
    <>
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
    </>
  );
};

export default RealmContainer;
