import * as React from "react";
import { View, TextInput, Text, TextStyle, TextInputProps } from "react-native";
import { FieldError } from "react-hook-form";
import { inputStyles } from "./input-styles";
import { useState } from "react";

interface InputProps {
  name: string;
  value: string;
  label?: string;
  secureEntry?: boolean;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  error?: FieldError | undefined;
  setValue: (name: string, value: string, validate?: boolean) => void;
}

const Input = (props: InputProps): React.ReactElement => {
  const { label, labelStyle, error, ...inputProps } = props;
  const [inputValue, setInputValue] = useState(props.value);

  const onChange = (val: string) => {
    props.setValue(label ?? "", val, true);
    setInputValue(val);
  }

  return (
    <View style={inputStyles.container}>
      {label && <Text style={[inputStyles.label, labelStyle]}>{label}</Text>}
      <TextInput
        autoCapitalize="none"
        style={[
          inputStyles.input,
          props.inputStyle,
          { borderColor: error ? "#fc6d47" : "#c0cbd3" },
        ]}
        {...inputProps}
        secureTextEntry={props.secureEntry ?? false}
        value={inputValue}
        onChangeText={onChange}
      />
      <Text style={inputStyles.textError}>{error && error.message}</Text>
    </View>
  );
};

export default Input;
