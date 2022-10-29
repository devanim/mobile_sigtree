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
    props.setValue(props.name, data ?? "", true);

    if (props.onChange) {
      props.onChange(data ?? "0");
    }

    setDropdownValue(data ?? undefined);
  };
  console.log("ddl", dropdownValue);
  return (
    <View style={{ flex: 1 }}>
      {props.label && <Text style={[dropdownStyles.label, props.labelStyle]}>{props.label}</Text>}
      <DropDownPicker
        style={[dropdownStyles.dropDownStyle, props.dropdownStyle, { borderColor: props.error ? "#fc6d47" : "#c0cbd3" },]}
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
        dropDownDirection="TOP"
      />
      <Text style={dropdownStyles.textError}>{props.error && props.error.message}</Text>
    </View>
  );
};

type DropdownProps = {
  name: string;
  placeholder: string;
  value?: string | number;
  error?: FieldError | undefined;
  label?: string;
  labelStyle?: TextStyle;
  dropdownStyle?: TextStyle;
  list: DropdownValue[];
  zIndex: number;
  zIndexInverse: number;
  setValue: (name: string, value: string, validate?: boolean) => void;
  onChange?: (value: string) => void;
}

export default Dropdown;
