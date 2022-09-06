import React, { useState } from "react";
import { StyleSheet, Image, FlatList } from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import Container from "components/Container";

import { Images } from "assets/images";
import { RootStackParamList } from "../../navigation/type";
import AdMob from "components/AdMob";

const LandingPage = () => {
  const [selectedRealm, setSelectedRealm] = useState("");
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const realmsList = [
    {children: "KeycloackRealm1", onPress: () => setSelectedRealm("KeycloackRealm1")},
    {children: "KeycloackRealm2", onPress: () => setSelectedRealm("KeycloackRealm2")},
    {children: "KeycloackRealm3", onPress: () => setSelectedRealm("KeycloackRealm3")},
    {children: "KeycloackRealm4", onPress: () => setSelectedRealm("KeycloackRealm4")},
    {children: "Add new realm", onPress: () => navigate("Auth", { screen: "Home" })},
    {children: "Back", onPress: () => navigate("Auth", { screen: "Home" })},
  ];

  const renderItem = React.useCallback(({ item }) => {
    return item.ads ? (
      <AdMob marginTop={8} />
    ) : (
      <Button style={styles.button} {...item} size={'small'}/>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <FlatList
        data={realmsList || []}
        renderItem={renderItem}
        keyExtractor={(i, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
      />
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