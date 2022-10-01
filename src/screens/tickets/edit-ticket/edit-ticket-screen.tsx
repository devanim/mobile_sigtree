import { Button } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppStackParamList } from "../../../routing/route-screens";
import EditTicket from "./edit-ticket";

const EditTicketScreen = (props: any): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const ticketDetails = props.route.params;

  return (
    <>
      <Button title="Cancel Edit" onPress={goBack} />
      <EditTicket ticket={ticketDetails}/>
    </>
  );
};

export default EditTicketScreen;