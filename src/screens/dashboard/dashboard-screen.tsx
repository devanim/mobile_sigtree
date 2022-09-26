import React from "react";
import { Layout } from "@ui-kitten/components";

import Container from "../../components/container";
import { dashboardStyles } from "./dashboard-screen-styles";
import NavigationAction from "../../components/navigation-action";
import useLayout from "../../hooks/useLayout";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native-web-refresh-control";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList, AuthenticatedParamList } from "../../routing/route-screens";

const DashboardScreen = (): JSX.Element => {
  const layoutData = useLayout();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (<Container style={dashboardStyles.container}>
    <ScrollView
        contentContainerStyle={dashboardStyles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        {/* <Header />
        <BestSeller />
        <Gallery /> */}
    </ScrollView>
    <Layout level="2" style={[dashboardStyles.bottomTab, { paddingBottom: layoutData.bottom  }]}>
      <NavigationAction icon="house" status="primary" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "DashboardScreen"})} />
      <NavigationAction icon="book" status="snow" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "ArticlesScreen"})} />
      <NavigationAction icon="calendar" status="snow" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "TicketsScreen"})}/>
      <NavigationAction icon="user" status="snow" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "UserScreen"})}/>
    </Layout>
  </Container>)
};

export default DashboardScreen;