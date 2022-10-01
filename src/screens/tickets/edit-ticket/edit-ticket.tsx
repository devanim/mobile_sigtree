import * as React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ticket } from "src/models/ticket/ticket";

import TicketForm from "../new-ticket/ticket-form";
import { editTicketStyles } from "./edit-ticket-styles";

const EditTicket = (props: EditTicketProps): JSX.Element => {
  const onSubmit = (data: any) => {
    //TODO - make request to backend using axios
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={editTicketStyles.container}
      style={{ backgroundColor: "#181e34" }}
    >
      <View style={editTicketStyles.formContainer}>
        <TicketForm mode={"edit"} ticket={props.ticket}/>
      </View>
    </KeyboardAwareScrollView>
  );
};

type EditTicketProps = {
  ticket: Ticket
}

export default EditTicket;