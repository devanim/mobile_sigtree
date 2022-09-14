import { ticketsScreenStyle } from "./tickets-screen-style";
import { Text } from "react-native";

import Container from "../../../src/components/Container";

const TicketsScreen = (): JSX.Element => {
  return (<Container style={ticketsScreenStyle.container}>
    <Text>
      {"Tickets list placeholder here"}
    </Text>
  </Container>);
};

export default TicketsScreen;