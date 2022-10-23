import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet, View } from 'react-native';

import Container from "../../components/container";
import NavigationAction from "../../components/navigation-action";
import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import UserContainer from "./user-container";
import { userScreenStyle } from "./user-screen-style";

const UserScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
  <Container style={userScreenStyle.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title={t("USER_PROFILE_TITLE").toUpperCase()}/>
    <UserContainer/>
  </Container>);
};

export default UserScreen;