import * as React from "react";
import { useState } from "react";
import { FieldError } from "react-hook-form";
import { TextStyle, View } from "react-native";
import { HelperText, TextInput } from 'react-native-paper';

interface InputProps {
  name: any;
  value: string;
  label?: string;
  secureEntry?: boolean;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  error?: FieldError | undefined;
  setValue: (name: any, value: string, validate?: boolean) => void;
}

const Input = (props: InputProps): React.ReactElement => {
  const { name, label, error, ...inputProps } = props;
  const [inputValue, setInputValue] = useState(props.value);

  const onChange = (val: string) => {
    props.setValue(name, val, true);
    setInputValue(val);
  }
  const hasErrors = () => {
    if (!error) return false;
    return error && error.message && error?.message?.length > 0;
  };
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        label={label}
        autoCapitalize="none"
        style={[
          {
            borderColor: hasErrors() ? "#fc6d47" : "#c0cbd3", backgroundColor: '#FFFFFF'
          },
          props.inputStyle,
        ]}
        mode="outlined"
        {...inputProps}
        secureTextEntry={props.secureEntry ?? false}
        value={inputValue}
        onChangeText={onChange}
      />
      <HelperText type="error" visible={hasErrors()}>
        {error && error.message}
      </HelperText>
    </View>
  );
};

export default Input;
