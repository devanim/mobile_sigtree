import * as React from "react";
import { View, Button, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";

// You can import from local files
import Input from "../../../components/form/input";
import Form from "../../../components/form/form";
import ticketValidation from "./ticket-validations";
import { newTicketStyles } from "./new-ticket-styles";

const NewTicket = (): JSX.Element => {
  const { handleSubmit, register, setValue, formState: {errors} } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert("data", JSON.stringify(data));
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={newTicketStyles.container}
      style={{ backgroundColor: "#181e34" }}
    >
      <View style={newTicketStyles.formContainer}>
        <Form {...{ register, setValue, validation: ticketValidation, errors }}>
          <Input name="name" label="Name " />
          <Input name="email" label="Email" />
          <Input name="password" label="Password" secureTextEntry={true} />
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </Form>
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
