import { Button } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";

import Text from "../../../components/text";
import { realmHandlerStyles } from "./realm-container-styles";
import RealmSelector, {
  BarcodeReadPayload,
} from "../../../components/realm-selector/realm-selector";
import RealmList from "./realm-list";
import { useKeycloak } from "expo-keycloak-auth";
import RealmDetails from "../../../models/realm-details";
import RealmContext from "../../../context/RealmContext";
import { REALMS_KEY } from "../../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { AuthSessionResult, TokenError } from "expo-auth-session";

const RealmContainer = (): JSX.Element => {
  const {
    ready, // If the discovery is already fetched and ready to prompt authentication flow
    login, // The login function - opens the browser
    isLoggedIn, // Helper boolean to use e.g. in your components down the tree
    token, // Access token, if available
    logout, // The logout function - Logs the user out
  } = useKeycloak();
  const [showRealmSelector, setShowRealmSelector] = useState(false);
  const { realmData: realmData, setRealm } = useContext(RealmContext);
  const [storedRealms, setStoredRealms] = useState<RealmDetails[]>([]);
  //const realm = `{"name": "test","clientId":"sigtree-app","keycloakUrl":"http://localhost8080"}`;

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
    login();
  };

  const onRemoveRealmCallback = (realmName: string) => {
    const newRealms = storedRealms.filter(
      (realm: RealmDetails) => realm.name !== realmName
    );

    setStoredRealms(newRealms);
    AsyncStorage.setItem(REALMS_KEY, JSON.stringify(newRealms));
  };

  const onBarcodeReadCallback = (payload: BarcodeReadPayload) => {
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
    login().then((data: AuthSessionResult) => {
      alert(`data ${JSON.stringify(data)}`);
    })
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
      <Button
        style={realmHandlerStyles.button}
        children={"Logout"}
        onPress={() => logout()}
        size={"small"}
      />
      <Text>{`Token value: ${token}`}</Text>
      <Text>{`IsLoggedInd: ${isLoggedIn}`}</Text>
      {toggleRealmSelectorComponent()}
    </>
  );
};

export default RealmContainer;
