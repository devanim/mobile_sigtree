import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "../../components/navigation-action";
import React from "react";
import { Text } from "react-native";
import { AppStackParamList } from "src/routing/route-screens";

import Container from "../../components/container";
import { notificationsScreenStyle } from "./notifications-screen-style";

const NotificationsScreen = (): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (<Container style={notificationsScreenStyle.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title="Notifications"/>
    <Text>
      {"Notifications list placeholder here"}
    </Text>
  </Container>);
};

export default NotificationsScreen;