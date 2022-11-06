import React, { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import { DocumentResult } from "expo-document-picker";
import LocalizationContext from "../../localization/localization-context";
import { TicketAttachment } from "../../models/ticket/ticket";

const FilePicker = (props: FilePickerProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const [valuesList, setValuesList] = useState<TicketAttachment[]>([]);

  const uploadDocument = async () => {
    const result: DocumentResult = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      const name = result.name;
      const fileBase64 = await FileSystem.readAsStringAsync(result.uri,{ encoding: "base64" });
      setValuesList(valuesList => [...valuesList, {name: name, content: fileBase64}]);
      props.setValue(props.name, valuesList);
    }
  };

  const removeUpload = (fileName: string) => {
    const filteredData = valuesList.filter((val) => {
        return val.name !== fileName;
    });
    setValuesList(filteredData);
  }
  
  return (
    <>
      <Text>Mumu mimi</Text>
      {
        valuesList.map((val, idx) => {
          return (
            <View  key={idx}>
              <Text>{val.name}</Text>
              <Button onPress={() => removeUpload(val.name)}>X</Button>
            </View>
          );
        })
      }
      <Button
        mode="outlined"
        onPress={uploadDocument}
        style={styles.submit}
      >
        {t("TICKET_UPLOAD")}
      </Button>
    </>
  )
};

interface FilePickerProps {
  name: string;
  value: TicketAttachment[];
  label?: string;
  secureEntry?: boolean;
  setValue: (name: string, value: TicketAttachment[], validate?: boolean) => void;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  dropdown: {
    marginVertical: "5%",
    paddingVertical: 10,
  },
  submit: {
    marginVertical: "10%",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 0,
  },
});

export default FilePicker;