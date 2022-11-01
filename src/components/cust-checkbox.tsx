import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import { UserFormData } from "../screens/user/edit-user/edit-user-container";

const CustCheckbox = (props: CustCheckboxProps): JSX.Element => {
  const [isChecked, setChecked] = useState(props.isChecked);

  const onValueChange = (val: boolean) => {
    props.setValue(props.name, val, { shouldValidate: true });
    setChecked(val);
  };

  return (
    <View style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        disabled={props.isDisabled ?? true}
        value={isChecked}
        onValueChange={onValueChange}
      />
      <Text>{props.label}</Text>
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
const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    margin: '1.5%',
  },
});

export default CustCheckbox;
