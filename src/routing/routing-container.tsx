import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import Intro from "screens/intro/Intro";
import HomeScreen from "../screens/landing/home-screen";
import DashboardNavigator from "./dashboard-navigator";
import { AppStackParamList } from "./route-screens";

const Stack = createNativeStackNavigator<AppStackParamList>();

const RoutingContainer = (): ReactElement => {
  return (<NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DashboardNavigator" component={DashboardNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RoutingContainer;