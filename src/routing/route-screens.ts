import { NavigatorScreenParams } from "@react-navigation/native";

export type AppStackParamList = {
  HomeScreen: NavigatorScreenParams<UnauthenticatedParamList>;
  DashboardNavigator: NavigatorScreenParams<AuthenticatedParamList>;
  Intro: undefined;
};

export type AuthenticatedParamList = {
  DashboardScreen: undefined;
  ArticlesScreen: undefined;
  TicketsScreen: undefined;
  UserScreen: undefined;
  NotificationsScreen: undefined;
};

export type UnauthenticatedParamList = {
  HomeScreen: undefined;
}