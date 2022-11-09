import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form/dist/types/form";
import { NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData, View, Text } from "react-native";
import { Chip, TextInput, HelperText } from 'react-native-paper';

const ChipInput = (props: ChipInputProps): JSX.Element => {
  const [tags, setTags] = useState<string[]>(props.tags);
  const [inputValue, setInputValue] = useState("");

  const removeTag = (item: string) => {
    const newTags = [...tags];
    const index = newTags.indexOf(item, 0);
    
    if (index > -1) {
      newTags.splice(index, 1);
    }

    props.setValue(props.name, newTags.join(","));
    setTags(newTags);
  };
  
  const onSubmitText = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const indexOf = tags.indexOf(e.nativeEvent.text);

    if (indexOf > -1) {
      setInputValue("");
      return;
    }

    const newTags = [...tags, e.nativeEvent.text];
    setTags(newTags);
    props.setValue(props.name, newTags.join(","));
    setInputValue("");
  };

  const onChangeText = (val: string) => {
    setInputValue(val);
  }

  return (
      <View  style={{ flex: 1 }} >
        <TextInput
          label={<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, letterSpacing: 0.96, textTransform: "uppercase", fontWeight: '400', color: "#000" }}>{props.label}</Text>}
          autoCapitalize="none"
          style={[
            {
              // borderColor: hasErrors() ? "#f23543" : "#000", backgroundColor: hasErrors() ? 'rgba(245, 87, 83, 0.1)' : 'transparent'
              borderColor: "#000", backgroundColor: 'transparent'
            }
          ]}
          underlineColor="#000"
          selectionColor="#000"
          mode="flat"
          value={inputValue}
          onChangeText={onChangeText}
          theme={{
            colors: {
              text: "#000", primary: '#626262'
            }
          }}
          onSubmitEditing={(e) => onSubmitText(e)}
        />
      <View style={styles.tagsContainer}>
        {tags.map((item, idx) => (
          <Chip key={idx} closeIcon="close" selectedColor="white" onClose={() => removeTag(item)} style={styles.chip}>{item}</Chip>
        ))}
      </View>
    </View>
  );
};

type ChipInputProps = {
  tags: string[];
  name: string;
  label: string;
  inputValue: string;
  setValue: (name: string, value: string) => void;
}

const styles = StyleSheet.create({
  tagsContainer: {
    flex: 4,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FFF",
    marginBottom: 2,
  }, 
  chip: {
    flex: 4,
    flexDirection: "row",
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 3,
    borderColor: '#000',
    borderWidth: 1
  }
});

export default ChipInput;