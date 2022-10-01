import React, { useState, useCallback } from "react";
import { FieldError } from "react-hook-form";
import { TextStyle, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { DropdownValue } from "src/models/common/dropdown-value";
import { dropdownStyles } from "./dropdown-styles";

const Dropdown = (props: DropdownProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(props.value);
  const [valuesList, setValuesList] = useState(props.list);
  
  const onDropdownOpen = useCallback(() => {
    const i = 2;
  }, []);

  const onChange = (data: string | null) => {
    //TODO - fix this ?? thingy
    props.setValue(props.label ?? "", data ?? "", true);
    setDropdownValue(data ?? undefined);
  };

  return (
    <View style={dropdownStyles.container}>
      {props.label && <Text style={[dropdownStyles.label, props.labelStyle]}>{props.label}</Text>}
      <DropDownPicker
        style={[dropdownStyles.dropdown, props.dropdownStyle, { borderColor: props.error ? "#fc6d47" : "#c0cbd3" },]}
        open={open}
        value={dropdownValue ?? ""}
        items={valuesList}
        setOpen={setOpen}
        setValue={setDropdownValue}
        setItems={setValuesList}
        placeholder={props.placeholder}
        placeholderStyle={dropdownStyles.placeholderStyles}
        onOpen={onDropdownOpen}
        onChangeValue={onChange}
        zIndex={300}
        zIndexInverse={100}
      />
    </View>
  );
};

type DropdownProps = {
  placeholder: string;
  value?: string;
  error?: FieldError | undefined;
  label?: string;
  labelStyle?: TextStyle;
  dropdownStyle?: TextStyle;
  list: DropdownValue[];
  zIndex: number;
  zIndexInverse: number;
  setValue: (name: string, value: string, validate?: boolean) => void;
}

export default Dropdown;
