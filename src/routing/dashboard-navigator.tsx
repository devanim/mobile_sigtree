import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthenticatedParamList } from "./route-screens";

import DashboardScreen from "../screens/dashboard/dashboard-screen";
import ArticlesScreen from "../screens/articles/articles-screen";
import TicketsScreen from "../screens/tickets/tickets-screen";
import UserScreen from "../screens/user/user-screen";
import NotificationsScreen from "../screens/notifications/notifications-screen";

const Stack = createNativeStackNavigator<AuthenticatedParamList>();

const DashboardNavigator = (): Stack.Navigator => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="DashboardScreen">
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="ArticlesScreen" component={ArticlesScreen} />
      <Stack.Screen name="TicketsScreen" component={TicketsScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;