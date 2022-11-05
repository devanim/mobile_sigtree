import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Appbar } from 'react-native-paper';
import { Language } from "src/models/language/language";
import { LanguagesPayload } from "src/models/language/languages-payload";
import { AppStackParamList } from "src/routing/route-screens";

import Error, { ErrorProps } from "../../../components/error";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import LocalizationContext from "../../../localization/localization-context";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import EditUserContainer from "./edit-user-container";

const EditUserScreen = (props: EditUserScreenProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { token, realm } = useKeycloak();
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [languageList, setLanguage] = useState<Language[] | undefined>(undefined);
  const userProfile = props.route.params.params;


  useEffect(() => {
    getTicket();
  }, []);

  const getTicket = async () => {
    try {
      const reqUrl = SigtreeConfiguration.getUrl(realm, SCREEN_URL.LANGUAGES_URL);
      const response = await axios.get<LanguagesPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        setLanguage(response.data.data);
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

  if (!languageList) {
    return <ActivityIndicator />;
  }

  return (
    <Layout style={styles.container} level='1'>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={t("TICKETS_ADD_TICKET").toUpperCase()} />
        <Appbar.Action icon="window-close" onPress={goBack} />
      </Appbar.Header>
      <EditUserContainer userProfile={userProfile} languageList={languageList} />
    </Layout>
  );
}

type EditUserScreenProps = {
  route: any;
  navigation: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: "10%",
  },
  header: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});
export default EditUserScreen;
