import * as React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ticket } from "src/models/ticket/ticket";

import TicketForm from "../new-ticket/ticket-form";
import EditTicketForm from "./edit-ticket-form";
import { editTicketStyles } from "./edit-ticket-styles";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import { UserProfile } from "../../../models/user-profile/user-profile";
import { UserProfilePayload } from "../../../models/user-profile/user-profile-payload";
import Error, { ErrorProps } from "../../../components/error";
import LocalizationContext from "../../../localization/localization-context";
import { AppStackParamList } from "../../../routing/route-screens";
import { useKeycloak } from "../../../keycloak/useKeycloak";

const EditTicket = (props: EditTicketProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
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
    <KeyboardAwareScrollView
      contentContainerStyle={editTicketStyles.container}
      style={{ backgroundColor: "#181e34" }}
    >
      <View style={editTicketStyles.formContainer}>
        <EditTicketForm ticket={props.ticket} userProfile={userProfile}/>
      </View>
    </KeyboardAwareScrollView>
  );
};

type EditTicketProps = {
  ticket: Ticket
}

export default EditTicket;