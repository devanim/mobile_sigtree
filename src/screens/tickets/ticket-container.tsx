import { useContext } from "react";
import { View } from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import TicketsList from "./tickets-list";
import { ticketContainerStyles } from "./ticket-container-styles";
import { AppStackParamList } from "../../routing/route-screens";
import LocalizationContext from "../../localization/localization-context";

const TicketContainer = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <View>
      <Button style={ticketContainerStyles.button} children={t("TICKETS_ADD_TICKET")} onPress={() => navigate("NewTicketScreen", {screen: "NewTicketScreen"})} size={'small'}/>
      <TicketsList />
    </View>
  );
};

export default TicketContainer;