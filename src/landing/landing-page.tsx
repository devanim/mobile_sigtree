import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import Container from "components/Container";

import { RootStackParamList } from "../../navigation/type";
import AdMob from "components/AdMob";
import Login from "../login/login";

const LandingPage = () => {
  const [selectedRealm, setSelectedRealm] = useState("");
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  //TODO - get this from back-end
  const realmsList = [
    {children: "KeycloackRealm1", onPress: () => setSelectedRealm("KeycloackRealm1")},
    {children: "KeycloackRealm2", onPress: () => setSelectedRealm("KeycloackRealm2")},
    {children: "KeycloackRealm3", onPress: () => setSelectedRealm("KeycloackRealm3")},
    {children: "KeycloackRealm4", onPress: () => setSelectedRealm("KeycloackRealm4")},
    {children: "Add new realm", onPress: () => navigate("Auth", { screen: "Home" })},
  ];

  const renderItem = React.useCallback(({ item }) => {
    return item.ads ? (
      <AdMob marginTop={8} />
    ) : (
      <Button style={styles.button} {...item} size={'small'}/>
    );
  }, []);

  const resetSelectedRealm = () => {
    setSelectedRealm("");
  }

  const togglePageData = () => {
    if (selectedRealm.length === 0) {
      return <FlatList
        data={realmsList || []}
        renderItem={renderItem}
        keyExtractor={(i, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
      />;
    }

    return <Login realmName={selectedRealm} toggleRealmsCallback={resetSelectedRealm}/>;
  }

  return (
    <Container style={styles.container}>
      {togglePageData()}
    </Container>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  contentContainerStyle: {
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  image: {
    alignSelf: "center",
    marginBottom: 8,
    transform: [{ scale: 0.7 }],
  },
  button: {
    marginTop: 8,
  },
});