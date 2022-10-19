import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Button } from "@ui-kitten/components/ui";
import React, { useState } from "react";
import axios from "axios";
import { FieldError, useForm } from "react-hook-form";
import { View } from "react-native";
import { DropdownValue } from "../../../models/common/dropdown-value";
import { Priority } from "../../../models/ticket/priority-enum";
import { AppStackParamList } from "../../../routing/route-screens";
import Dropdown from "../../../components/form/dropdown";
import { ticketFormStyles } from "./ticket-form-styles";
import Input from "../../../components/form/input";
import { Ticket } from "../../../models/ticket/ticket";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import { TicketPayload } from "../../../models/ticket/ticket-payload";

const TicketForm = (props: TicketFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<FormData>();
  const { token, realm } = useKeycloak();
  //TODO - try to use form state instead of new state
  const [errors, setErrors] = useState<FormErrors | undefined>(undefined);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  //TODO - get this data from back-end
  const priorityList: DropdownValue[] = [
    { label: Priority.LOW, value: Priority.LOW },
    { label: Priority.MEDIUM, value: Priority.MEDIUM },
    { label: Priority.HIGH, value: Priority.HIGH },
  ];
  //TODO - see how to obtain category list
  const categoryList: DropdownValue[] = [
    { label: "Cleaning", value: "Cleaning" },
    { label: "Electric", value: "Electric" },
    { label: "Maintenance", value: "Maintenance" },
  ];
  //TODO - see how to obtain floor details based on building
  const floorList: DropdownValue[] = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
  ];

  const onSubmit = async () => {
    const vals = getValues();
    console.log("Data values", vals);
    
    const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TICKET_URL)}`;
    const response = await axios.post<TicketPayload>(reqUrl, vals, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response", response);
    goBack();
  };

  const onInvalid = (err: any) => {
    setErrors(err);
  };

  return (
    <View>
      <Button children={"Submit"} onPress={handleSubmit(onSubmit, onInvalid)} />
      <Button children={"Cancel"} onPress={goBack} />
      <View style={ticketFormStyles.spacedView}>
        <Dropdown
          label="Category"
          value={props.ticket?.category}
          error={errors ? errors["Category"] : undefined}
          placeholder="Select Category"
          dropdownStyle={ticketFormStyles.spacedView}
          list={categoryList}
          {...register("Category", {
            required: { value: true, message: "Category is required" },
          })}
          setValue={setValue}
        />
      </View>
      <Input
        label="Title"
        value={props.ticket?.name ?? ""}
        error={errors ? errors["Title"] : undefined}
        {...register("Title", {
          required: { value: true, message: "Title is required" },
        })}
        setValue={setValue}
      />
      <Input
        label="Description"
        value={props.ticket?.content ?? ""}
        error={errors ? errors["Description"] : undefined}
        multiline={true}
        inputStyle={ticketFormStyles.multilineHeight}
        {...register("Description", {
          required: { value: true, message: "Description is required" },
        })}
        setValue={setValue}
      />
      <View style={ticketFormStyles.twoOnRow}>
        <Dropdown
          label="Priority"
          value={props.ticket?.priorityKey ?? ""}
          error={errors ? errors["Priority"] : undefined}
          placeholder="Select Priority"
          list={priorityList}
          {...register("Priority", {
            required: { value: true, message: "Priority is required" },
          })}
          setValue={setValue}
        />
        <Dropdown
          label="Floor"
          value={props.ticket?.floor ?? ""}
          error={errors ? errors["Floor"] : undefined}
          placeholder="Select Floor"
          list={floorList}
          {...register("Floor", {
            required: { value: true, message: "Floor is required" },
          })}
          setValue={setValue}
        />
      </View>
    </View>
  );
};

type FormData = {
  Category: string,
  Title: string,
  Description: string,
  Priority: Priority,
  Floor: string
}

type FormErrors = {
  Category: FieldError,
  Title: FieldError,
  Description: FieldError,
  Priority: FieldError,
  Floor: FieldError
}

type TicketFormProps = {
  mode: "insert"|"edit",
  ticket?: Ticket
}

export default TicketForm;
