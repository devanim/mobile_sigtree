import React, { useState } from "react";
import { FlatList } from "react-native";
import { Button } from "@ui-kitten/components";

import Container from "components/Container";

import AdMob from "components/AdMob";
import Login from "../login/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REALMS_KEY } from "src/utils/constants";
import RealmSelector, { BarcodeReadPayload } from "../realm-selector/realm-selector";
import { landingPageStyles } from "./landing-page-styles";
import RealmDetails from "../realm-selector/realm-details";

const LandingPage = (): JSX.Element => {
  const [selectedRealm, setSelectedRealm] = useState("");
  const [showRealmSelector, setShowRealmSelector] = useState(false);

  //TODO - get this from AsyncStorage
  const realmsList = [
    {children: "KeycloackRealm1", onPress: () => setSelectedRealm("KeycloackRealm1")},
    {children: "KeycloackRealm2", onPress: () => setSelectedRealm("KeycloackRealm2")},
    {children: "KeycloackRealm3", onPress: () => setSelectedRealm("KeycloackRealm3")},
    {children: "KeycloackRealm4", onPress: () => setSelectedRealm("KeycloackRealm4")},
    {children: "Add new realm", onPress: () => setShowRealmSelector(true)},
  ];

  //TODO - uncomment this when we have data saved
  // useEffect(() => {
  //   AsyncStorage.getItem(REALMS_KEY).then((value) => {
  //     realmsList = value;
  //   });
  // });

  const renderItem = React.useCallback(({ item }) => {
    return item.ads ? (
      <AdMob marginTop={8} />
    ) : (
      <Button style={landingPageStyles.button} {...item} size={'small'}/>
    );
  }, []);

  const resetSelectedRealm = () => {
    setSelectedRealm("");
  }

  const resetRealmSelectorComponent = () => {
    setShowRealmSelector(false);
  }

  const onBarcodeReadCallback = (payload: BarcodeReadPayload) => {
    const barcodeData = new RealmDetails(payload.data);

    if (!barcodeData.sucesfullyParsed) {
      alert(`Error: ${barcodeData.parsingError}`);
      return;
    }

    alert(`Bar code with keycloakUrl ${barcodeData.keycloakUrl} and backendUrl ${barcodeData.backendUrl}!`);
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
        data={realmsList || []}
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