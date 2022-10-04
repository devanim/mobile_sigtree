import { useEffect } from "react";
import { Button } from "@ui-kitten/components";
import PdfReader from "./pdf-reader";

const TermsOfService = (props: TermsOfServiceProps): JSX.Element => {
  let endpointUrl = "https://test/api";

  if (props.buildingId) {
    endpointUrl += `/${props.buildingId}`;
  }

  useEffect(() => {
    //TODO add logic for retrieving data from back-end here
  });

  return (
    <>
      <PdfReader sourceUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"/>
    </>
  );
};

type TermsOfServiceProps = {
  buildingId: number | undefined;
}

export default TermsOfService;