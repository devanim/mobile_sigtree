import React, { useContext, useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
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
      {/* <Text>{t("TICKETS_ADD_FORM_ATTACHMENTS")}</Text> */}
      {
        valuesList.map((val, idx) => {
          return (
            <View  key={idx}>
              <Text>{val.name} <Button onPress={() => removeUpload(val.name)}>X</Button></Text>
            </View>
          );
        })
      }
      <Pressable style={styles.button} onPress={uploadDocument} >
        <Text style={styles.text}>{t("TICKETS_ADD_FORM_ATTACHMENTS")}</Text>
      </Pressable>
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
    flex: 1
  },
  button: {
    // borderRadius: 3,
    elevation: 3,
    backgroundColor: '#F0F4FD',
    borderWidth: 1,
    borderColor: 'rgba(230, 230, 230, 0.7)',
    // height: 50,
    flex: 1, flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    color: '#000000',
    fontSize: 16,
    textAlign: "center",
  }

});

export default FilePicker;