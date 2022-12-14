import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import axios from "axios";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from 'react-native-paper';
import { Ticket } from "src/models/ticket/ticket";

import Error, { ErrorProps } from "../../../components/error";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import LocalizationContext from "../../../localization/localization-context";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import { UserProfile } from "../../../models/user-profile/user-profile";
import { UserProfilePayload } from "../../../models/user-profile/user-profile-payload";
import { AppStackParamList } from "../../../routing/route-screens";
import EditTicketForm from "./edit-ticket-form";

const EditTicket = (props: EditTicketProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);

  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const { token, realm } = useKeycloak();
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(
    undefined
  );
  const [error, setError] = useState<ErrorProps | undefined>(undefined);

  useEffect(() => {
    const source = axios.CancelToken.source();

    getUserProfileDetails();

    return () => source.cancel("Data fetching cancelled");
  }, []);

  const getUserProfileDetails = async () => {
    try {
      const response = await axios.get<UserProfilePayload>(
        SigtreeConfiguration.getUrl(realm, SCREEN_URL.USER_PROFILE_URL),
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status == 200) {
        setUserProfile(response.data.data);
      } else {
        const friendlyMessage = t("FAILED_REQUEST");
        setError({
          friendlyMessage: friendlyMessage,
          errorMessage: response.data.error ?? "",
        });
      }
    } catch (error) {
      const friendlyMessage = t("FAILED_REQUEST");
      setError({
        friendlyMessage: friendlyMessage,
        errorMessage: JSON.stringify(error),
      });
    }
  };

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  return (
    <Layout style={styles.container} level='1'>
      <Appbar.Header style={{ backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
        <Appbar.Content title={t("TICKETS_EDIT_TICKET").toUpperCase()} />
        <Appbar.Action icon="window-close" onPress={goBack} />
      </Appbar.Header>
      <EditTicketForm ticket={props.ticket} userProfile={userProfile} />
    </Layout>
  );
};

type EditTicketProps = {
  ticket: Ticket
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default EditTicket;