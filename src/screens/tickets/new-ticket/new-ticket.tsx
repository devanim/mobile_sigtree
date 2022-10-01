import * as React from "react";
import { View, Button, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";

import Form from "../../../components/form/form";
import ticketValidation from "./ticket-validations";
import { newTicketStyles } from "./new-ticket-styles";

const NewTicket = (): JSX.Element => {
  const { handleSubmit, register, setValue, formState: {errors} } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    //TODO - make request to backend using axios
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={newTicketStyles.container}
      style={{ backgroundColor: "#181e34" }}
    >
      <View style={newTicketStyles.formContainer}>
        <Form />
      </View>
    </KeyboardAwareScrollView>
  );
};

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default NewTicket;
