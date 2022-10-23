import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Text, View } from "react-native";
import { UserFormData } from "../screens/user/edit-user/edit-user-form";
import custCheckbokStyles from "./cust-checkbox-styles";

const CustCheckbox = (props: CustCheckboxProps): JSX.Element => {
  const [isChecked, setChecked] = useState(props.isChecked);
  
  const onValueChange = (val: boolean) => {
    props.setValue(props.name, val, {shouldValidate: true});
    setChecked(val);
  };

  return (
    <View style={custCheckbokStyles.section}>
      <Checkbox
        style={custCheckbokStyles.checkbox}
        disabled={props.isDisabled ?? true}
        value={isChecked}
        onValueChange={onValueChange}
      />
      <Text style={custCheckbokStyles.paragraph}>{props.label}</Text>
    </View>
  );
};

type CustCheckboxProps = {
  name:
    | "lang"
    | "firstName"
    | "lastName"
    | "username"
    | "email"
    | "phoneNumber"
    | "notifyOnNewNote"
    | "notifyOnStatusNew"
    | "notifyOnStatusProgress"
    | "notifyOnStatusPending"
    | "notifyOnStatusResolved"
    | "notifyOnStatusClosed"
    | "notifyOnMyTicketsOnly"
    | "allowNewsletters"
    | "notifyOnNewDocument";
  isChecked: boolean;
  isDisabled?: boolean;
  label: string;
  setValue: UseFormSetValue<UserFormData>;
};

export default CustCheckbox;
