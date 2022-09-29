import React, { useState, useCallback } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { dropdownStyles } from "./dropdown-styles";

const Dropdown = (): JSX.Element => {
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer Not to Say", value: "neutral" },
  ]);
  
  const onGenderOpen = useCallback(() => {
    //setCompanyOpen(false);
    alert(`opened gender dropdown`);
  }, []);

  const onChange = (data: any) => {
    alert(`Value changed ${JSON.stringify(data)}`);
  };

  return (
    <View style={dropdownStyles.container}>
      <DropDownPicker
        style={dropdownStyles.dropdown}
        open={genderOpen}
        value={genderValue}
        items={gender}
        setOpen={setGenderOpen}
        setValue={setGenderValue}
        setItems={setGender}
        placeholder="Select Gender"
        placeholderStyle={dropdownStyles.placeholderStyles}
        onOpen={onGenderOpen}
        onChangeValue={onChange}
        zIndex={3000}
        zIndexInverse={1000}
      />
    </View>
  );
};

export default Dropdown;
