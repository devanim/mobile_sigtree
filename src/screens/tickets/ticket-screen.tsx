import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppBar from "../../components/appbar/appbar";
import axios from "axios";

import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { EditUserPayload } from "../../models/user-profile/edit-user-payload";
import TicketCard from "./ticket-card";
import TicketNotes from "./ticket-notes";
import BottomNavigation from "../../components/bottom-navigation";
import { NavigationType } from "../../models/dashboard/navigation-enum";
import { CapitalizeFirstLowercaseRest } from "../../utils/text";

const TicketScreen = (props: ArticleScreenProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { realm, logout, token } = useKeycloak();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const [isLoading, setIsLoading] = useState(true);
  const ticketId = props.route.params.params.ticketId;
  const status = props.route.params.params.status;
  const role = props.route.params.params.roleId;

  useEffect(() => {
    setIsLoading(true);
    if (status === "TICKET_NEW" && role === 6) {
      updateTicketStatusToRead();
    }
    setIsLoading(false);
  }, []);

  const updateTicketStatusToRead = async () => {
    const vals = { idstatus: 1 }
    const reqUrl = `${SigtreeConfiguration.getUrl(realm, `${SCREEN_URL.TICKET_URL}/${ticketId}`)}`;

    try {
      const response = await axios.put<EditUserPayload>(reqUrl, vals, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  const onLogout = () => {
    logout();
    navigate("HomeScreen", { screen: "HomeScreen" });
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  return (
    <Layout style={styles.container} level='1'>
      <AppBar title={CapitalizeFirstLowercaseRest(t("TICKET_TITLE"))} />
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, flexDirection: 'column'}}>
            <TicketCard ticketId={ticketId} />
            <TicketNotes
              count={2}
              ticketId={ticketId}
              roleId={role}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <BottomNavigation type={NavigationType.TICKETS}/>
    </Layout>
  );
}

type ArticleScreenProps = {
  route: any;
  navigation: any;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default TicketScreen;
