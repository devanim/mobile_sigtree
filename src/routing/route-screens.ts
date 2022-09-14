import { NavigatorScreenParams } from "@react-navigation/native";

export type AppStackParamList = {
  LandingPage: NavigatorScreenParams<UnauthorizedParamList>;
  DashboardPage: NavigatorScreenParams<AuthorizedParamList>;
  Intro: undefined;
};

export type AuthorizedParamList = {
  Dashboard: undefined;
  Articles: undefined;
};

export type UnauthorizedParamList = {
  Landing: undefined;
}