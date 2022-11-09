import React, { useCallback, useState } from "react";
import { FieldError } from "react-hook-form";
import { Text, TextStyle, View } from "react-native";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { HelperText } from 'react-native-paper';
import { DropdownValue } from "src/models/common/dropdown-value";

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

  const hasErrors = () => {
    if (!props.error) return false;
    return props.error && props.error.message && props.error?.message?.length > 0;
  };
  return (
    <View style={{ flex: 1 }}>
      {/* {props.label && <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>} */}
      <DropDownPicker
        // label={props.label}
        style={[styles.dropdownStyle, { borderRadius: 0, borderColor: props.error ? "rgba(245, 87, 83, 0.1)" : "#00000012", backgroundColor: props.error ? 'rgba(245, 87, 83, 0.1)' : 'transparent' },]}
        open={open}
        value={dropdownValue ?? ""}
        items={valuesList}
        setOpen={setOpen}
        setValue={setDropdownValue}
        setItems={setValuesList}
        placeholder={props.placeholder}
        placeholderStyle={styles.placeholderStyles}
        onOpen={onDropdownOpen}
        onChangeValue={onChange}
        zIndex={300}
        zIndexInverse={100}
        dropDownDirection="TOP"
        dropDownContainerStyle={{
          backgroundColor: "#fafafa",
          borderRadius: 0,
          borderColor: "#00000012",
          borderWidth: 1,
          zIndex: 1000,
          // paddingLeft: 5
        }}
        // listItemLabel={{ 
        //   fontWeight: "bold",
        //   color: "pink"
        // }}
        selectedItemLabelStyle={{
          fontWeight: "bold"
        }}
        selectedItemContainerStyle={{
          backgroundColor: "#f0f0f0"
        }}
      />
      {/* <HelperText type="error" visible={hasErrors()}>
        {props.error && props.error.message}
      </HelperText> */}
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

const styles = StyleSheet.create({
  // label: {
    // paddingVertical: '2%',
  // }, 
  dropdownStyle: {
    borderWidth: 1
  },
  placeholderStyles: {
    color: "#cccccc",
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    letterSpacing: 0.96,
    textTransform: "uppercase",
    fontWeight: '400',
    paddingLeft: 5
  },
});

export default Dropdown;
