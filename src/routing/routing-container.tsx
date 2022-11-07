import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { AppStackParamList } from "./route-screens";

import NewTicketScreen from "../screens/tickets/new-ticket/new-ticket-screen";
import HomeScreen from "../screens/landing/home-screen";
import DashboardNavigator from "./dashboard-navigator";
import EditTicketScreen from "../screens/tickets/edit-ticket/edit-ticket-screen";
import TOSScreen from "../screens/terms-of-service/tos-screen";
import ArticleScreen from "../screens/articles/article-screen";
import TicketScreen from "../screens/tickets/ticket-screen";
import UserScreen from "../screens/user/user-screen";
import EditUserScreen from "../screens/user/edit-user/edit-user-screen";
import ChangePasswordScreen from "../screens/user/change-password/change-password-screen";

const Stack = createNativeStackNavigator<AppStackParamList>();

const RoutingContainer = (): ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomeScreen"
      >
        {/* 
            Disable animation to fix a crash on android related to webview and navigation
            See https://github.com/react-navigation/react-navigation/issues/9061#issuecomment-927279484
        */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TOSScreen" component={TOSScreen} />
        <Stack.Screen name="NewTicketScreen" component={NewTicketScreen} />
        <Stack.Screen name="EditTicketScreen" component={EditTicketScreen} options={{animation:'none'}} />
        <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="EditUserScreen" component={EditUserScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />

        <Stack.Screen name="TicketScreen" component={TicketScreen} options={{animation:'none'}} />
        <Stack.Screen name="DashboardNavigator" component={DashboardNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RoutingContainer;
