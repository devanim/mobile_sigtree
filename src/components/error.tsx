import { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import LocalizationContext from "../localization/localization-context";
import errorStyles from "./error-styles";

const Error = (props: ErrorProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const [showDebugMessage, setShowDebugMessage] = useState(false);

  const toggleDebugMessage = () => {
    const newState = !showDebugMessage;
    setShowDebugMessage(newState);
  }
  
  return (
    <View style={errorStyles.container}>
      <Text>{props.friendlyMessage}</Text>
      <Button title={t("TOGGLE_DEBUG_ERROR")} onPress={toggleDebugMessage}></Button>
      {showDebugMessage ? <Text>{props.errorMessage}</Text> : <></>}
    </View>
  );
};

export type ErrorProps = {
  friendlyMessage: string;
  errorMessage: string;
}

export default Error;