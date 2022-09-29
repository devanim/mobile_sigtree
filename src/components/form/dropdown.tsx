import React, { useState, useCallback } from "react";
import { TextStyle, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { DropdownValue } from "src/models/common/dropdown-value";
import { dropdownStyles } from "./dropdown-styles";

const Dropdown = (props: DropdownProps): JSX.Element => {
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState(props.list);
  
  const onGenderOpen = useCallback(() => {
    const i = 2;
  }, []);

  const onChange = (data: string | null) => {
    props.setValue(props.label ?? "", data ?? "");
  };

  return (
    <View style={dropdownStyles.container}>
      {props.label && <Text style={[dropdownStyles.label, props.labelStyle]}>{props.label}</Text>}
      <DropDownPicker
        style={dropdownStyles.dropdown}
        open={genderOpen}
        value={genderValue}
        items={gender}
        setOpen={setGenderOpen}
        setValue={setGenderValue}
        setItems={setGender}
        placeholder={props.placeholder}
        placeholderStyle={dropdownStyles.placeholderStyles}
        onOpen={onGenderOpen}
        onChangeValue={onChange}
        zIndex={3000}
        zIndexInverse={1000}
      />
    </View>
  );
};

type DropdownProps = {
  placeholder: string;
  label?: string;
  labelStyle?: TextStyle;
  list: DropdownValue[];
  setValue: (name: string, value: string, validate?: boolean) => void;
}

export default Dropdown;
