import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { AppStackParamList } from "./route-screens";

import NewTicketScreen from "../screens/tickets/new-ticket/new-ticket-screen";
import HomeScreen from "../screens/landing/home-screen";
import DashboardNavigator from "./dashboard-navigator";
import EditTicketScreen from "../screens/tickets/edit-ticket/edit-ticket-screen";
import TOSScreen from "../screens/terms-of-service/tos-screen";

const Stack = createNativeStackNavigator<AppStackParamList>();

const RoutingContainer = (): ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomeScreen"
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TOSScreen" component={TOSScreen} />
        <Stack.Screen name="NewTicketScreen" component={NewTicketScreen} />
        <Stack.Screen name="EditTicketScreen" component={EditTicketScreen} />
        <Stack.Screen name="DashboardNavigator" component={DashboardNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RoutingContainer;
