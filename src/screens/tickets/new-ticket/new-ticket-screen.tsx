import { Button } from "react-native";
import NewTicket from "./new-ticket";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppStackParamList } from "../../../routing/route-screens";
import React from "react";

const NewTicketScreen = (): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <>
      <Button title="Cancel" onPress={goBack} />
      <NewTicket />
    </>
  );
};

export default NewTicketScreen;
