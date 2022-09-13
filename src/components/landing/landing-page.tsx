import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Button } from "@ui-kitten/components";

import Container from "components/Container";

import AdMob from "components/AdMob";
import Login from "../login/login";
import RealmSelector, { BarcodeReadPayload } from "../realm-selector/realm-selector";
import { landingPageStyles } from "./landing-page-styles";
import RealmDetails from "../../models/realm-details";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REALMS_KEY } from "../../utils/constants";
import RealmContext from "../../context/RealmContext";

const LandingPage = (): JSX.Element => {
  const [storedRealms, setStoredRealms] = useState<RealmDetails[]>([]);
  const {realmData: realmData, setRealm} = useContext(RealmContext);
  const [showRealmSelector, setShowRealmSelector] = useState(false);

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

  const resetSelectedRealm = () => {
    setRealm(null);
  }

  const resetRealmSelectorComponent = () => {
    setShowRealmSelector(false);
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

    AsyncStorage.getItem(REALMS_KEY).then((realmValues) => {
      if (!realmValues) {
        setStoredRealms([]);
        return;
      }

      const parsedRealms = JSON.parse(realmValues);
      parsedRealms.push(parsedRealmDetails);
      setStoredRealms(parsedRealms);

      AsyncStorage.setItem(REALMS_KEY, JSON.stringify(parsedRealms));
    });

    setShowRealmSelector(false);
    alert(`Bar code with name ${parsedRealmDetails.name} keycloakUrl ${parsedRealmDetails.keycloakUrl} and backendUrl ${parsedRealmDetails.backendUrl} was added!`);
  }

  const toggleRealmSelectorComponent = () => {
    if (showRealmSelector === true) {
      return <RealmSelector onDataRead={onBarcodeReadCallback} onCancel={resetRealmSelectorComponent}/>
    }

    return togglePageData();
  }

  const containsKey = (key: string): boolean => {
    const existingKey = storedRealms.find(item => item.name === key);

    if (existingKey) {
      return true;
    } else {
      return false;
    }
  }

  const togglePageData = () => {
    const tempRealms: LandingPageRealms[] = [];
      
    storedRealms.forEach((item: RealmDetails) => {
      tempRealms.push({children: item.name, onPress: () => {
        setRealm(item);
      }});
    });

    if (realmData == null || realmData?.keycloakUrl.length  === 0) {
      return <FlatList
          data={tempRealms || []}
          renderItem={renderItem}
          keyExtractor={(i, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={landingPageStyles.contentContainerStyle}
        />;
    }

    return <Login toggleRealmsCallback={resetSelectedRealm}/>;
  }

  const renderItem = React.useCallback(({ item }) => {
    return item.ads ? (<AdMob marginTop={8} />) : (<Button style={landingPageStyles.button} {...item} size={'small'}/>);
  }, []);

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