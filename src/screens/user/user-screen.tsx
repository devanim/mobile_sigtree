import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "components/NavigationAction";
import React from "react";
import { Text } from "react-native";
import { AppStackParamList } from "src/routing/route-screens";

import Container from "../../../src/components/Container";

import { userScreenStyle } from "./user-screen-style";

const UserScreen = (): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (<Container style={userScreenStyle.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title="User Profile"/>
    <Text>
      {"User placeholder here"}
    </Text>
  </Container>);
};

export default UserScreen;