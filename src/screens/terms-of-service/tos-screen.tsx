import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import axios from "axios";
import { View, Text, ActivityIndicator } from "react-native";
import { AppStackParamList } from "../../routing/route-screens";

import NavigationAction from "../../components/navigation-action";
import Container from "../../components/container";

import { tosScreenStyles } from "./tos-screen-styles";
import { useContext, useEffect, useState } from "react";
import { AUTH_MOCK, SCREEN_URL } from "../../models/mock-auth";
import PdfReader from "../../components/pdf-reader";
import Error, { ErrorProps } from "../../components/error";
import LocalizationContext from "../../localization/localization-context";
import { TOSPayload } from "../../models/tos/tos-payload";
import { TOS } from "../../models/tos/tos";
import TosBuilding from "./tos-building";

const TOSScreen = (props: TermsOfServiceScreenProps) => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const [tosList, setTosList] = useState<BuildingTos[]>([]);
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [tosUrl, setTosUrl] = useState<string | undefined>(undefined);
  const buildingsList: { id: number; name: string }[] =
    props.route.params.params.buildings;

  useEffect(() => {
    getAllTosData();
  }, []);

  const getAllTosData = async () => {
    buildingsList.forEach(async (item) => {
      await getTOSList(item.id, item.name);
    });
  };

  const getTOSList = async (buildingId: number, buildingName: string) => {
    try {
      const reqUrl = `${SCREEN_URL.TOS_URL}/${buildingId}?all=false`;
      const response = await axios.get<TOSPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${AUTH_MOCK.TOKEN}` },
      });

      if (response.status == 200) {
        const buildingTos: BuildingTos = {
          buildingId: buildingId,
          buildingName: buildingName,
          tosList: [],
        };
        buildingTos.tosList = response.data.data.map((item) => {
          return { ...item };
        });
        const newState = [...tosList, buildingTos];

        setTosList(newState);
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
    <Container style={tosScreenStyles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction onPress={goBack} />}
        title={t("TOS_TITLE")}
      />
      <View style={tosScreenStyles.container}>
        {tosList.map((item) => (
          <TosBuilding
            key={item.buildingId}
            buildingName={item.buildingName}
            tosList={item.tosList}
            onTosSelect={onTosSelect}
          />
        ))}
      </View>
      {tosUrl ? (<PdfReader sourceUrl={tosUrl} />) : (<></>)}
    </Container>
  );
};

type TermsOfServiceScreenProps = {
  route: any;
  navigation: any;
};

class BuildingTos {
  public buildingId!: number;
  public buildingName!: string;
  public tosList!: TOS[];
}

export default TOSScreen;
