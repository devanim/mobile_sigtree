import * as React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import TicketForm from "./ticket-form";
import { newTicketStyles } from "./new-ticket-styles";

const NewTicket = (): JSX.Element => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={newTicketStyles.container}
      style={{ backgroundColor: "#181e34" }}
    >
      <View style={newTicketStyles.formContainer}>
        <TicketForm mode={"insert"}/>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default NewTicket;
