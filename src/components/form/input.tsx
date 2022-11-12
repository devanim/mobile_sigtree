import * as React from "react";
import { useState } from "react";
import { FieldError } from "react-hook-form";
import { TextStyle, View, Text } from "react-native";
import { HelperText, TextInput } from 'react-native-paper';
import normalize from '../../utils/normalize';

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
    // <Text style={{ color: '#f23543', fontSize: 20 }}>*</Text>
    <View style={{ flex: 1, borderColor: hasErrors() ? "#f23543" : "#000", backgroundColor: hasErrors() ? 'rgba(245, 87, 83, 0.1)' : 'transparent' }}>
      <TextInput
        label={<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: normalize(11), letterSpacing: normalize(0.96), textTransform: "uppercase", fontWeight: '400', color: "#000" }}>{label}</Text>}
        autoCapitalize="none"
        style={[
          {
            backgroundColor: 'transparent'
          }
        ]}
        underlineColor="#000"
        selectionColor="#000"
        mode="flat"
        {...inputProps}
        secureTextEntry={props.secureEntry ?? false}
        value={inputValue}
        onChangeText={onChange}
        theme={{
          colors: {
            text: "#000", primary: '#626262' 
          } 
        }}
      />
      {/* <HelperText type="error" visible={hasErrors()}>
        {error && error.message}
      </HelperText> */}
    </View>
  );
};

export default Input;
