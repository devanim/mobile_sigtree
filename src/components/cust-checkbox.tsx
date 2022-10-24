import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Text, View, StyleSheet } from "react-native";
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
      <Text style={styles.paragraph}>{props.label}</Text>
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
  paragraph: {
    //fontSize: 15,
    // color: "#000"
  },
  checkbox: {
    margin: '1.5%',
  },
});

export default CustCheckbox;
