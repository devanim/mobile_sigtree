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
        backgroundColor={props.type === NavigationType.DASHBOARD ? "#C0C0C0" : "#FFF"}
        icon="house"
        status={props.type === NavigationType.DASHBOARD ? "blue" : "secondary"}
        size="small"
        onPress={() =>
          navigate("DashboardNavigator", { screen: "DashboardScreen" })
        }
      />
      <NavigationAction
        backgroundColor={props.type === NavigationType.ARTICLES ? "#C0C0C0" : "#FFF"}
        icon="book"
        status={props.type === NavigationType.ARTICLES ? "blue" : "secondary"}
        size="small"
        onPress={() =>
          navigate("DashboardNavigator", { screen: "ArticlesScreen" })
        }
      />
      <NavigationAction
        backgroundColor={props.type === NavigationType.ADD_TICKET ? "#C0C0C0" : "#FFF"}
        icon="add"
        status={props.type === NavigationType.ADD_TICKET ? "blue" : "secondary"}
        size="giant"
        onPress={() =>
          navigate("NewTicketScreen", { screen: "NewTicketScreen" })
        }
      />
      <NavigationAction
        backgroundColor={props.type === NavigationType.TICKETS ? "#C0C0C0" : "#FFF"}
        icon="calendar"
        status={props.type === NavigationType.TICKETS ? "blue" : "secondary"}
        size="small"
        onPress={() =>
          navigate("DashboardNavigator", { screen: "TicketsScreen" })
        }
      />
      <NavigationAction
        backgroundColor={props.type === NavigationType.USER ? "#C0C0C0" : "#FFF"}
        icon="user"
        status={props.type === NavigationType.USER ? "blue" : "secondary"}
        size="small"
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
    justifyContent: "space-between",
    paddingTop: 12,
    alignItems: "center",
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 8,
  },
  content: {
    paddingBottom: 100,
  },
});

export default BottomNavigation;
