import { NavigatorScreenParams } from "@react-navigation/native";

export type AppStackParamList = {
  HomeScreen: NavigatorScreenParams<UnauthenticatedParamList>;
  NewTicketScreen: NavigatorScreenParams<AuthenticatedParamList>;
  EditTicketScreen: NavigatorScreenParams<AuthenticatedParamList>;
  TicketScreen: NavigatorScreenParams<TicketParamList>;
  TOSScreen: NavigatorScreenParams<UnauthenticatedParamList>;
  ArticleScreen: NavigatorScreenParams<ArticleParamList>;
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

export type ArticleParamList = {
  ArticleScreen: any;
  ArticleId: number;
}

export type TicketParamList = {
  TicketScreen: any;
  TicketId: string;
}