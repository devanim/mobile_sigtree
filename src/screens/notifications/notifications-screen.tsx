import { notificationsScreenStyle } from "./notifications-screen-style";
import { Text } from "react-native";

import Container from "../../../src/components/Container";

const NotificationsScreen = (): JSX.Element => {
  return (<Container style={notificationsScreenStyle.container}>
    <Text>
      {"Notifications list placeholder here"}
    </Text>
  </Container>);
};

export default NotificationsScreen;