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
import { AppStackParamList } from "src/routing/route-screens";

const DashboardScreen = (): JSX.Element => {
  const layoutData = useLayout();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

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
      <NavigationAction icon="calendar" status="snow" size="medium" onPress={() => navigate("LandingPage")} />
      <NavigationAction icon="beachHouse" status="snow" size="medium" />
      <NavigationAction icon="fire" status="snow" size="medium" />
      <NavigationAction icon="user" status="primary" size="medium" />
    </Layout>
  </Container>)
};

export default DashboardScreen;