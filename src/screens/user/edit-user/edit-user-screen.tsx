import EditUserForm from "./edit-user-form";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "../../../components/navigation-action";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../../routing/route-screens";
import LocalizationContext from "../../../localization/localization-context";
import { useContext } from "react";
import Container from "../../../components/container";


const EditUserScreen = (props: EditUserScreenProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const userProfile = props.route.params.params;
  
  return (
    <Container>
      <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title={t("USER_PROFILE_EDIT_TITLE")}/>
      <EditUserForm userProfile={userProfile}/>
    </Container>
  );
}

type EditUserScreenProps = {
  route: any;
  navigation: any;
}

export default EditUserScreen;