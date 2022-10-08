import React, { useContext } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "../../components/navigation-action";
import { AppStackParamList } from "../../routing/route-screens";

import Container from "../../components/container";
import UserContainer from "./user-container";
import LocalizationContext from "../../localization/localization-context";

import { userScreenStyle } from "./user-screen-style";

const UserScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (<Container style={userScreenStyle.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title={t("USER_PROFILE_TITLE")}/>
    <UserContainer />
  </Container>);
};

export default UserScreen;