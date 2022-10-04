import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import custCheckbokStyles from './cust-checkbox-styles';

const CustCheckbox = (): JSX.Element => {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={custCheckbokStyles.container}>
      <View style={custCheckbokStyles.section}>
        <Checkbox style={custCheckbokStyles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text style={custCheckbokStyles.paragraph}>Normal checkbox</Text>
      </View>
      <View style={custCheckbokStyles.section}>
        <Checkbox
          style={custCheckbokStyles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
        <Text style={custCheckbokStyles.paragraph}>Custom colored checkbox</Text>
      </View>
      <View style={custCheckbokStyles.section}>
        <Checkbox style={custCheckbokStyles.checkbox} disabled value={isChecked} onValueChange={setChecked} />
        <Text style={custCheckbokStyles.paragraph}>Disabled checkbox</Text>
      </View>
    </View>
  );
};

export default CustCheckbox;