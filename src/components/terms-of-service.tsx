import { useEffect } from "react";
import { View } from "react-native";
import PdfReader from "./pdf-reader";
import Text from "./Text";

const TermsOfService = (props: TermsOfServiceProps): JSX.Element => {
  let endpointUrl = "https://test/api";

  if (props.buildingId) {
    endpointUrl += `/${props.buildingId}`;
  }

  useEffect(() => {
    //TODO add logic for retrieving data from back-end here
  });

  return (
    <View>
      <Text>PDF reader</Text>
      <PdfReader sourceUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"/>
    </View>
  );
};

interface TermsOfServiceProps {
  buildingId: number | undefined;
  onCancel: Function;
}

export default TermsOfService;