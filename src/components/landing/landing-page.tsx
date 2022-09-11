import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Button } from "@ui-kitten/components";

import Container from "components/Container";

import AdMob from "components/AdMob";
import Login from "../login/login";
import RealmSelector, { BarcodeReadPayload } from "../realm-selector/realm-selector";
import { landingPageStyles } from "./landing-page-styles";
import RealmDetails from "../../models/realm-details";
import { RealmStorage } from "../../models/realm-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REALMS_KEY } from "../../utils/constants";

const LandingPage = (): JSX.Element => {
  const emptyRealmDetails: LandingPageRealms[] = [];
  const [realms, setRealms] = useState(emptyRealmDetails);
  const [selectedRealm, setSelectedRealm] = useState("");
  const [showRealmSelector, setShowRealmSelector] = useState(false);
  const storage = new RealmStorage();


  useEffect(() => {
    AsyncStorage.getItem(REALMS_KEY).then((value) => {
      if (!value) {
        setRealms(emptyRealmDetails);
        return;
      }
      
      const parsed: RealmDetails[] = JSON.parse(value);
      
      const realms: LandingPageRealms[] = [];
      parsed.forEach((item: RealmDetails) => {
        realms.push({children: item.name, onPress: () => setShowRealmSelector(true)});
      });
      setRealms(realms);
    });
  }, [realms]);

  const renderItem = React.useCallback(({ item }) => {
    return item.ads ? (<AdMob marginTop={8} />) : 
      (<Button style={landingPageStyles.button} {...item} size={'small'}/>);
  }, []);

  const resetSelectedRealm = () => {
    setSelectedRealm("");
  }

  const resetRealmSelectorComponent = () => {
    setShowRealmSelector(false);
  }

  const onBarcodeReadCallback = (payload: BarcodeReadPayload) => {
    const realmData = new RealmDetails(payload.data);

    if (!realmData.sucesfullyParsed) {
      alert(`Error: ${realmData.parsingError}`);
      return;
    }

    if (storage.containsKey(realmData.keycloakUrl)) {
      alert(`Realm ${realmData.keycloakUrl} is already configured on this device`);
      return;
    }

    storage.saveRealm(realmData);

    const newRealms = realms;
    newRealms.push({children: realmData.name, onPress: () => setSelectedRealm(realmData.name)});
    setRealms(newRealms);

    setShowRealmSelector(false);
    alert(`Bar code with name ${realmData.name} keycloakUrl ${realmData.keycloakUrl} and backendUrl ${realmData.backendUrl} was added!`);
  }

  const toggleRealmSelectorComponent = () => {
    if (showRealmSelector === true) {
      return <RealmSelector onDataRead={onBarcodeReadCallback} onCancel={resetRealmSelectorComponent}/>
    }

    return togglePageData();
  }

  const togglePageData = () => {
    if (selectedRealm.length === 0) {
      return <FlatList
          data={realms || []}
          renderItem={renderItem}
          keyExtractor={(i, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={landingPageStyles.contentContainerStyle}
        />;
    }

    return <Login realmName={selectedRealm} toggleRealmsCallback={resetSelectedRealm}/>;
  }

  return (<Container style={landingPageStyles.container}>
    <Button style={landingPageStyles.button} children={"Add new realm"} onPress={() => setShowRealmSelector(true)} size={'small'}/>
    {toggleRealmSelectorComponent()}
  </Container>);
};

interface LandingPageRealms {
  children: string;
  onPress: Function;
}

export default LandingPage;