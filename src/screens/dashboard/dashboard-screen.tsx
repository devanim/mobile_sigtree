import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

import Container from "../../components/container";
import NavigationAction from "../../components/navigation-action";
import useLayout from "../../hooks/useLayout";
import { AppStackParamList } from "../../routing/route-screens";
import DashboardStatistics from "./dashboard-statistics";

const DashboardScreen = (): JSX.Element => {
  const layoutData = useLayout();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <Container style={styles.container}>
      <DashboardStatistics />
      <Layout level="2" style={[styles.bottomTab, { paddingBottom: layoutData.bottom }]}>
        <NavigationAction icon="house" status="secondary" size="small" onPress={() => navigate("DashboardNavigator", { screen: "DashboardScreen" })} />
        <NavigationAction icon="book" status="secondary" size="small" onPress={() => navigate("DashboardNavigator", { screen: "ArticlesScreen" })} />
        <NavigationAction icon="add" status="secondary" size="giant" onPress={() => navigate("NewTicketScreen", { screen: "NewTicketScreen" })} />
        <NavigationAction icon="calendar" status="secondary" size="small" onPress={() => navigate("DashboardNavigator", { screen: "TicketsScreen" })} />
        <NavigationAction icon="user" status="secondary" size="small" onPress={() => navigate("DashboardNavigator", { screen: "UserScreen" })} />
      </Layout>
    </Container>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    color: '#000'
  },
  bottomTab: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 12,
    alignItems: "center",
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  },
  button: {
    marginTop: 8,
  },
  content: {
    paddingBottom: 100,
  },
});

export default DashboardScreen;