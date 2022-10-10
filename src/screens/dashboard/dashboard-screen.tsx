import React, { useContext } from "react";
import { Layout } from "@ui-kitten/components";
import { View, Image } from "react-native";

import Container from "../../components/container";
import { dashboardStyles } from "./dashboard-screen-styles";
import NavigationAction from "../../components/navigation-action";
import useLayout from "../../hooks/useLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../routing/route-screens";
import DashboardStatistics from "./dashboard-statistics";
import LocalizationContext from "../../localization/localization-context";

const DashboardScreen = (): JSX.Element => {
  const layoutData = useLayout();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const { t } = useContext(LocalizationContext);

  return (
  <Container style={dashboardStyles.container}>
    <DashboardStatistics />
    <Layout level="2" style={[dashboardStyles.bottomTab, { paddingBottom: layoutData.bottom  }]}>
      <NavigationAction icon="house" status="primary" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "DashboardScreen"})} />
      <NavigationAction icon="book" status="snow" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "ArticlesScreen"})} />
      <NavigationAction icon="add" status="snow" size="medium" onPress={() => navigate("NewTicketScreen", {screen: "NewTicketScreen"})}/>
      <NavigationAction icon="calendar" status="snow" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "TicketsScreen"})}/>
      <NavigationAction icon="user" status="snow" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "UserScreen"})}/>
    </Layout>
  </Container>
  )
};

export default DashboardScreen;