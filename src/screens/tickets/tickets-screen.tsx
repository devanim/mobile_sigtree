import { Layout } from "@ui-kitten/components";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import AppBar from "../../components/appbar/appbar";
import Error, { ErrorProps } from "../../components/error";
import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { UserProfile } from "../../models/user-profile/user-profile";
import { UserProfilePayload } from "../../models/user-profile/user-profile-payload";
import TicketContainer from "./ticket-container";

const TicketsScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { realm, token } = useKeycloak();
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

  if (!userProfile) {
    return <ActivityIndicator />;
  }

  return (
    <Layout style={styles.container} level='1'>
      <AppBar title={t("TICKET_TITLE").toUpperCase()} />
      <TicketContainer roleId={userProfile.role} />
    </Layout>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default TicketsScreen;