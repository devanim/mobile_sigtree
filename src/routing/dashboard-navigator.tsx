import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ArticlesScreen from "../screens/articles/articles-screen";
import DashboardScreen from "../screens/dashboard/dashboard-screen";
import NotificationsScreen from "../screens/notifications/notifications-screen";
import TicketsScreen from "../screens/tickets/tickets-screen";
import NewTicketScreen from "../screens/tickets/new-ticket/new-ticket-screen";
import UserScreen from "../screens/user/user-screen";
import { AuthenticatedParamList } from "./route-screens";

const Stack = createNativeStackNavigator<AuthenticatedParamList>();

const DashboardNavigator = (): Stack.Navigator => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="DashboardScreen" >
        <Stack.Screen options={{ gestureEnabled: false }} name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="ArticlesScreen" component={ArticlesScreen} />
        <Stack.Screen name="TicketsScreen" component={TicketsScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="NewTicketScreen" component={NewTicketScreen} />
      </Stack.Navigator>
    </>
  );
};

export default DashboardNavigator;