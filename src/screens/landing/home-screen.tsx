import React, { useContext, useEffect, useState } from "react";

import Container from "../../../src/components/Container";
import { Button } from "@ui-kitten/components";

import RealmSelector, { BarcodeReadPayload } from "../../components/realm-selector/realm-selector";
import { homeScreenStyles } from "./home-screen-styles";
import RealmDetails from "../../models/realm-details";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REALMS_KEY } from "../../utils/constants";
import RealmList from "./realm-list";
import RealmContext from "../../context/RealmContext";
import { useKeycloak } from "expo-keycloak-auth";
import TermsOfService from "../../components/terms-of-service";
import Text from "components/Text";

const HomeScreen = (): JSX.Element => {
  const {
    ready, // If the discovery is already fetched and ready to prompt authentication flow 
    login, // The login function - opens the browser
    isLoggedIn, // Helper boolean to use e.g. in your components down the tree
    token, // Access token, if available
    logout, // The logout function - Logs the user out
  } = useKeycloak();
  const [storedRealms, setStoredRealms] = useState<RealmDetails[]>([]);
  const {realmData: realmData, setRealm} = useContext(RealmContext);
  const [showRealmSelector, setShowRealmSelector] = useState(false);
  const [showTOS, setShowTOS] = useState(false);
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
  }

  const onRealmSelectedCallback = (realmDetails: RealmDetails) => {
    setRealm(realmDetails);
    login();
  }

  const onRemoveRealmCallback = (realmName: string) => {
    const newRealms = storedRealms.filter((realm: RealmDetails) => realm.name !== realmName);

    setStoredRealms(newRealms);
    AsyncStorage.setItem(REALMS_KEY, JSON.stringify(newRealms));
  }

  const onBarcodeReadCallback = (payload: BarcodeReadPayload) => {
    const parsedRealmDetails = new RealmDetails(payload.data);
    
    if (!parsedRealmDetails.sucesfullyParsed) {
      alert(`Error: ${parsedRealmDetails.parsingError}`);
      return;
    }

    if (containsKey(parsedRealmDetails.name)) {
      alert(`Realm ${parsedRealmDetails.name} is already configured on this device`);
      return;
    }

    const currentRealms = storedRealms;
    currentRealms.push(parsedRealmDetails);

    setStoredRealms(currentRealms);
    AsyncStorage.setItem(REALMS_KEY, JSON.stringify(currentRealms));
    
    setShowRealmSelector(false);
  }

  const toggleRealmSelectorComponent = () => {
    if (showRealmSelector === true) {
      return <RealmSelector onDataRead={onBarcodeReadCallback} onCancel={resetRealmSelectorComponent}/>
    }

    return <RealmList storedRealms={storedRealms} onRealmSelected={onRealmSelectedCallback} onRemoveRealm={onRemoveRealmCallback}/>;
  }

  const containsKey = (key: string): boolean => {
    const existingKey = storedRealms.find(item => item.name === key);

    if (existingKey) {
      return true;
    } else {
      return false;
    }
  }

  return (<Container style={homeScreenStyles.container}>
    <Button style={homeScreenStyles.button} children={"Add new realm"} onPress={() => setShowRealmSelector(true)} size={'small'}/>
    <Button style={homeScreenStyles.button} children={"Read Tems of Services"} onPress={() => setShowTOS(true)} size={'small'}/>
    <Button style={homeScreenStyles.button} children={"Default realm"} onPress={() => login()} size={'small'}/>
    <Text>{`Token value: ${token}`}</Text>
    <Text>{`IsLoggedInd: ${isLoggedIn}`}</Text>
    {toggleRealmSelectorComponent()}
  </Container>);
};

export default HomeScreen;