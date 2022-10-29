import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Appbar } from 'react-native-paper';
import axios from "axios";

import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { UserProfilePayload } from "../../models/user-profile/user-profile-payload";
import Error, { ErrorProps } from "../../components/error";
import { UserProfile } from "../../models/user-profile/user-profile";
import TicketContainer from "./ticket-container";

const TicketsScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { realm, token, logout } = useKeycloak();
  const { goBack, navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(
    undefined
  );
  const [error, setError] = useState<ErrorProps | undefined>(undefined);

  const onLogout = () => {
    logout();
    navigate("HomeScreen", { screen: "HomeScreen" });
  }

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
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={t("TICKET_TITLE").toUpperCase()} />
        <Appbar.Action icon="logout" onPress={onLogout} />
      </Appbar.Header>
      <TicketContainer roleId={userProfile.role}/>
    </Layout>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default TicketsScreen;