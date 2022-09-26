import React, { memo } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import Container from "../components/container";
import { RootStackParamList } from "../routing/type";
import AdMob from "../components/ad-mob";

const Intro = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const data = [
    {
      children: "Sigtree Entry Point",
      onPress: () => navigate("HomeScreen", { screen: "Onboarding" }),
    },
    {
      children: "Sigtree Dashboard",
      onPress: () => navigate("DashboardNavigator", { screen: "DashboardScreen" }),
    }
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
        data={data || []}
        renderItem={renderItem}
        keyExtractor={(i, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Container>
  );
});

export default Intro;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  contentContainerStyle: {
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  button: {
    marginTop: 8,
  }
});
