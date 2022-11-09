import React from "react";
import { StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";

import NavigationAction from "./navigation-action";
import useLayout from "../hooks/useLayout";
import { AppStackParamList } from "../routing/route-screens";
import { NavigationType } from "../models/dashboard/navigation-enum";

const BottomNavigation = (props: BottomNavigationProps): JSX.Element => {
  const layoutData = useLayout();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <Layout
      level="2"
      style={[styles.bottomTab, { paddingBottom: layoutData.bottom }]}
    >
      <NavigationAction
        backgroundColor={props.type === NavigationType.DASHBOARD ? "#F0F4FD" : "#FFF"}
        color={props.type === NavigationType.DASHBOARD ? "black" : "black"}
        title={'\u{e617}'}
        fontFamily={"Pages-icon"}
        fontSize={24}
        onPress={() =>
          navigate("DashboardNavigator", { screen: "DashboardScreen" })
        }
      />
      <NavigationAction
        backgroundColor={props.type === NavigationType.ARTICLES ? "#F0F4FD" : "#FFF"}
        color={props.type === NavigationType.ARTICLES ? "black" : "black"}
        title={'\u{e61e}'}
        fontFamily={"Pages-icon"}
        fontSize={24}
        onPress={() =>
          navigate("DashboardNavigator", { screen: "ArticlesScreen" })
        }
      />
      <NavigationAction
        backgroundColor={props.type === NavigationType.ADD_TICKET ? "#F0F4FD" : "#FFF"}
        title={'\u{e656}'}
        fontFamily={"Pages-icon"}
        fontSize={24}
        color={props.type === NavigationType.ADD_TICKET ? "black" : "black"}
        onPress={() =>
          navigate("NewTicketScreen", { screen: "NewTicketScreen" })
        }
      />
      <NavigationAction
        backgroundColor={props.type === NavigationType.TICKETS ? "#F0F4FD" : "#FFF"}
        title={'\u{e621}'}
        fontFamily={"Pages-icon"}
        fontSize={24}
        color={props.type === NavigationType.TICKETS ? "black" : "black"}
        onPress={() =>
          navigate("DashboardNavigator", { screen: "TicketsScreen" })
        }
      />
      <NavigationAction
        backgroundColor={props.type === NavigationType.USER ? "#F0F4FD" : "#FFF"}
        title={'\u{e949}'}
        fontFamily={"Pages-icon2"}
        fontSize={24}
        color={props.type === NavigationType.USER ? "black" : "black"}
        onPress={() => navigate("DashboardNavigator", { screen: "UserScreen" })}
      />
    </Layout>
  );
};

type BottomNavigationProps = {
  type: NavigationType;
};

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: "row",
    flex: 1,
    // paddingTop: 20,
    padding: 3,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: 'rgba(230, 230, 230, 0.7)',
    height: 'auto'
  }
});

export default BottomNavigation;
