import React from "react";
import { Layout } from "@ui-kitten/components";

import Container from "../../../src/components/Container";
import { dashboardStyles } from "./dashboard-screen-styles";
import NavigationAction from "components/NavigationAction";
import useLayout from "../../hooks/useLayout";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native-web-refresh-control";

import Header from "screens/eCommerce/ECommerceHome/Header";
import BestSeller from "screens/eCommerce/ECommerceHome/BestSeller";
import Gallery from "screens/eCommerce/ECommerceHome/Gallery";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthenticatedParamList } from "../../routing/route-screens";

const DashboardScreen = (): JSX.Element => {
  const layoutData = useLayout();
  const { navigate } = useNavigation<NavigationProp<AuthenticatedParamList>>();

  return (<Container style={dashboardStyles.container}>
    <ScrollView
        contentContainerStyle={dashboardStyles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        <Header />
        <BestSeller />
        <Gallery />
      </ScrollView>
    <Layout level="2" style={[dashboardStyles.bottomTab, { paddingBottom: layoutData.bottom  }]}>
      <NavigationAction icon="settings" status="primary" size="medium" onPress={() => navigate("ArticlesScreen")} />
      <NavigationAction icon="calendar" status="snow" size="medium" onPress={() => navigate("ArticlesScreen")} />
      <NavigationAction icon="beachHouse" status="snow" size="medium" onPress={() => navigate("TicketsScreen")}/>
      <NavigationAction icon="fire" status="snow" size="medium" onPress={() => navigate("UserScreen")}/>
      <NavigationAction icon="user" status="snow" size="medium" onPress={() => navigate("NotificationsScreen")}/>
    </Layout>
  </Container>)
};

export default DashboardScreen;