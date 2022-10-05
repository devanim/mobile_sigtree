import { NavigatorScreenParams } from "@react-navigation/native";

export type AppStackParamList = {
  HomeScreen: NavigatorScreenParams<UnauthenticatedParamList>;
  NewTicketScreen: NavigatorScreenParams<AuthenticatedParamList>;
  EditTicketScreen: NavigatorScreenParams<AuthenticatedParamList>;
  TOSScreen: NavigatorScreenParams<UnauthenticatedParamList>;
  ArticleScreen: NavigatorScreenParams<AuthenticatedParamList>;
  DashboardNavigator: NavigatorScreenParams<AuthenticatedParamList>;
};

export type AuthenticatedParamList = {
  DashboardScreen: undefined;
  ArticlesScreen: undefined;
  ArticleScreen: undefined;
  TicketsScreen: undefined;
  NewTicketScreen: undefined;
  EditTicketScreen: undefined;
  UserScreen: undefined;
  NotificationsScreen: undefined;
};

export type UnauthenticatedParamList = {
  HomeScreen: undefined;
  TOSScreen: undefined;
}