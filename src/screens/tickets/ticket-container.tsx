import { View } from "react-native";
import { Button } from "@ui-kitten/components";
import TicketsList from "./tickets-list";
import { ticketContainerStyles } from "./ticket-container-styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppStackParamList } from "src/routing/route-screens";

const TicketContainer = (): JSX.Element => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <View>
      <Button style={ticketContainerStyles.button} children={"Add ticket"} onPress={() => navigate("NewTicketScreen", {screen: "NewTicketScreen"})} size={'small'}/>
      <TicketsList />
    </View>
  );
};

export default TicketContainer;