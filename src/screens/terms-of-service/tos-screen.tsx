import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import axios from "axios";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { AppStackParamList } from "../../routing/route-screens";

import NavigationAction from "../../components/navigation-action";
import Container from "../../components/container";

import { tosScreenStyles } from "./tos-screen-styles";
import { useContext, useEffect, useState } from "react";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import PdfReader from "../../components/pdf-reader";
import Error, { ErrorProps } from "../../components/error";
import LocalizationContext from "../../localization/localization-context";
import { TOSPayload } from "../../models/tos/tos-payload";
import TosBuilding from "./tos-building";
import { BuildingTos } from "../../models/tos/building-tos";
import { useKeycloak } from "../../keycloak/useKeycloak";
import * as React from "react";
import BottomNavigation from "../../components/bottom-navigation";
import { NavigationType } from "../../models/dashboard/navigation-enum";

const TOSScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const { token, realm } = useKeycloak();
  const [tosList, setTosList] = useState<BuildingTos[]>([]);
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [tosUrl, setTosUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    getTOSList();
  }, []);

  const getTOSList = async () => {
    try {
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TOS_URL)}/all`;
      const response = await axios.get<TOSPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        setTosList(response.data.data);
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

  const onTosSelect = (tosUrl: string) => {
    setTosUrl(tosUrl);
  };

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  if (!tosList || tosList.length == 0) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Container style={tosScreenStyles.container}>
        <TopNavigation
          accessoryLeft={() => <NavigationAction onPress={goBack} />}
          title={t("TOS_TITLE")}
        />
        <View style={tosScreenStyles.container}>
          <TosBuilding
            tosList={tosList}
            onTosSelect={onTosSelect}
          />
        </View>
        {tosUrl ? (<PdfReader sourceUrl={tosUrl} />) : (<></>)}
      </Container>
      <BottomNavigation type={NavigationType.USER}/>
    </>
  );
};

type TermsOfServiceScreenProps = {
  route: any;
  navigation: any;
};

export default TOSScreen;
