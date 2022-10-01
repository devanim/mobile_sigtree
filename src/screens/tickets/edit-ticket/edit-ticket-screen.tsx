import { Button } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppStackParamList } from "../../../routing/route-screens";


const EditTicketScreen = (): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <>
      <Button title="Cancel Edit" onPress={goBack} />
    </>
  );
};

export default EditTicketScreen;