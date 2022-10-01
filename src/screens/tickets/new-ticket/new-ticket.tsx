import * as React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import TicketForm from "./ticket-form";
import { newTicketStyles } from "./new-ticket-styles";

const NewTicket = (): JSX.Element => {
  const onSubmit = (data: any) => {
    //TODO - make request to backend using axios
  };

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
