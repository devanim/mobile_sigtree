import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthenticatedParamList } from "src/routing/route-screens";

export type RootStackParamList = {
  HomeScreen: NavigatorScreenParams<OnboardingParamList>;
  DashboardNavigator: NavigatorScreenParams<AuthenticatedParamList>;
  Intro: undefined;
};

export type OnboardingParamList = {
  Onboarding: undefined;
};