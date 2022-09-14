import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import Intro from "screens/intro/Intro";
import DashboardPage from "../../src/screens/dashboard/dashboard";
import LandingPage from "../../src/screens/landing/landing-page";
import { AppStackParamList } from "./route-screens";

const Stack = createNativeStackNavigator<AppStackParamList>();

const RoutingContainer = (): ReactElement => {
  return (<NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="DashboardPage" component={DashboardPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RoutingContainer;