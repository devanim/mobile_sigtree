import * as React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ticket } from "src/models/ticket/ticket";

import TicketForm from "../new-ticket/ticket-form";
import EditTicketForm from "./edit-ticket-form";
import { editTicketStyles } from "./edit-ticket-styles";

const EditTicket = (props: EditTicketProps): JSX.Element => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={editTicketStyles.container}
      style={{ backgroundColor: "#181e34" }}
    >
      <View style={editTicketStyles.formContainer}>
        <EditTicketForm ticket={props.ticket}/>
      </View>
    </KeyboardAwareScrollView>
  );
};

type EditTicketProps = {
  ticket: Ticket
}

export default EditTicket;