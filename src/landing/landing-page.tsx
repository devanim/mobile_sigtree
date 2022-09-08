import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Button } from "@ui-kitten/components";

import Container from "components/Container";

import AdMob from "components/AdMob";
import Login from "../login/login";
import RealmSelector, { BarcodeReadPayload } from "../realm-selector/realm-selector";
import { landingPageStyles } from "./landing-page-styles";
import RealmDetails from "../realm-selector/realm-details";
import { RealmStorage } from "./realm-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REALMS_KEY } from "../utils/constants";

const LandingPage = (): JSX.Element => {
  const realmsList = [{children: "Add new realm", onPress: () => setShowRealmSelector(true)}];
  const [realms, setRealms] = useState(realmsList);
  const [selectedRealm, setSelectedRealm] = useState("");
  const [showRealmSelector, setShowRealmSelector] = useState(false);
  const storage = new RealmStorage();


  useEffect(() => {
    // storage.readStoredRealms();
    // alert(`here ${storage.storedRealms.length}`);
    // const newRealms = realmsList;
    // storage.storedRealms.forEach(realm => {
    //   newRealms.push({children: realm.name, onPress: () => setSelectedRealm(realm.name)});
    // });

    AsyncStorage.getItem(REALMS_KEY).then((value) => {
      if (!value) {
        setRealms(realmsList);
        return;
      }
      
      const parsed: RealmDetails[] = JSON.parse(value);
      const newRealms = realmsList;
      parsed.forEach(realm => {
        newRealms.push({children: realm.name, onPress: () => setSelectedRealm(realm.name)});
      });

      setRealms(newRealms);
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
    alert(`Bar code with name ${realmData.name} keycloakUrl ${realmData.keycloakUrl} and backendUrl ${realmData.backendUrl}!`);
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

  return (
    <Container style={landingPageStyles.container}>
      {toggleRealmSelectorComponent()}
    </Container>
  );
};

export default LandingPage;