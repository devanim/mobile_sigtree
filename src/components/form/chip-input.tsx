import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form/dist/types/form";
import { NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData, View } from "react-native";
import { Chip, TextInput } from 'react-native-paper';

const ChipInput = (props: ChipInputProps): JSX.Element => {
  const [tags, setTags] = useState<string[]>(props.tags);
  const [inputValue, setInputValue] = useState("");

  const removeTag = (item: string) => {
    const newTags = [...tags];
    const index = newTags.indexOf(item, 0);
    if (index > -1) {
      newTags.splice(index, 1);
    }
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
    <>
      <View style={styles.tagsContainer}>
        {tags.map((item, idx) => (
          <Chip key={idx} closeIcon="close" onClose={() => removeTag(item)} style={styles.chip}>{item}</Chip>
        ))}
      </View>
      <View>
        <TextInput
          label={props.label}
          autoCapitalize="none"
          style={[{ borderColor: "#c0cbd3", backgroundColor: '#FFFFFF'}]}
          mode="outlined"
          value={inputValue}
          onChangeText={onChangeText}
          onSubmitEditing={(e) => onSubmitText(e)}
        />
      </View>
    </>
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
    marginHorizontal: '2%',
    backgroundColor: '#fff',
    borderRadius: 0,
    borderColor: '#ccc',
    borderWidth: 1
  }
});

export default ChipInput;