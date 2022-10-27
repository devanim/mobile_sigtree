import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React from "react";

import Container from "../../components/container";
import NavigationAction from "../../components/navigation-action";
import useLayout from "../../hooks/useLayout";
import { AppStackParamList } from "../../routing/route-screens";
import { dashboardStyles } from "./dashboard-screen-styles";
import DashboardStatistics from "./dashboard-statistics";

const DashboardScreen = (): JSX.Element => {
  const layoutData = useLayout();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <Container style={dashboardStyles.container}>
      <DashboardStatistics />
      <Layout level="2" style={[dashboardStyles.bottomTab, { paddingBottom: layoutData.bottom }]}>
        <NavigationAction icon="house" status="secondary" size="small" onPress={() => navigate("DashboardNavigator", { screen: "DashboardScreen" })} />
        <NavigationAction icon="book" status="secondary" size="small" onPress={() => navigate("DashboardNavigator", { screen: "ArticlesScreen" })} />
        <NavigationAction icon="add" status="secondary" size="giant" onPress={() => navigate("NewTicketScreen", { screen: "NewTicketScreen" })} />
        <NavigationAction icon="calendar" status="secondary" size="small" onPress={() => navigate("DashboardNavigator", { screen: "TicketsScreen" })} />
        <NavigationAction icon="user" status="secondary" size="small" onPress={() => navigate("DashboardNavigator", { screen: "UserScreen" })} />
      </Layout>
    </Container>
  )
};

export default DashboardScreen;