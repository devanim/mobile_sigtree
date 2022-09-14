import { userScreenStyle } from "./user-screen-style";
import { Text } from "react-native";

import Container from "../../../src/components/Container";

const UserScreen = (): JSX.Element => {
  return (<Container style={userScreenStyle.container}>
    <Text>
      {"Articles list placeholder here"}
    </Text>
  </Container>);
};

export default UserScreen;