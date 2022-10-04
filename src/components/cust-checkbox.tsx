import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import custCheckbokStyles from './cust-checkbox-styles';

const CustCheckbox = (props: CustCheckboxProps): JSX.Element => {
  const [isChecked, setChecked] = useState(props.isChecked);

  return (
    <View style={custCheckbokStyles.section}>
      <Checkbox style={custCheckbokStyles.checkbox} disabled value={isChecked} onValueChange={setChecked} />
      <Text style={custCheckbokStyles.paragraph}>{props.label}</Text>
    </View>
  );
};

type CustCheckboxProps = {
  isChecked: boolean;
  label: string
}

export default CustCheckbox;