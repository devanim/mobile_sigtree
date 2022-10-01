import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthenticatedParamList } from "src/routing/route-screens";

//TODO - check where this is used
export type RootStackParamList = {
  HomeScreen: NavigatorScreenParams<OnboardingParamList>;
  DashboardNavigator: NavigatorScreenParams<AuthenticatedParamList>;
  NewTicketScreen: NavigatorScreenParams<AuthenticatedParamList>;
  EditTicketScreen: NavigatorScreenParams<AuthenticatedParamList>;
};

export type OnboardingParamList = {
  Onboarding: undefined;
};