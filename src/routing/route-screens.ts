import { NavigatorScreenParams } from "@react-navigation/native";
import { UserProfile } from "src/models/user-profile/user-profile";

export type AppStackParamList = {
  HomeScreen: NavigatorScreenParams<UnauthenticatedParamList>;
  NewTicketScreen: NavigatorScreenParams<AuthenticatedParamList>;
  EditTicketScreen: NavigatorScreenParams<AuthenticatedParamList>;
  TicketScreen: NavigatorScreenParams<TicketParamList>;
  TicketNotesScreen: NavigatorScreenParams<TicketParamList>;
  TOSScreen: NavigatorScreenParams<UnauthenticatedParamList>;
  ArticleScreen: NavigatorScreenParams<ArticleParamList>;
  UserScreen: NavigatorScreenParams<AuthenticatedParamList>;
  EditUserScreen: NavigatorScreenParams<EditUserProfileParamList>;
  ChangePasswordScreen: NavigatorScreenParams<AuthenticatedParamList>;
  DashboardNavigator: NavigatorScreenParams<AuthenticatedParamList>;
};

export type AuthenticatedParamList = {
  DashboardScreen: undefined;
  ArticlesScreen: undefined;
  ArticleScreen: undefined;
  TicketsScreen: undefined;
  NewTicketScreen: undefined;
  EditTicketScreen: undefined;
  TicketNotesScreen: undefined;
  UserScreen: undefined;
  EditUserScreen: undefined;
  ChangePasswordScreen: undefined;
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

export type EditUserProfileParamList = {
  EditUserScreen: any;
  UserProfile: UserProfile;
}
