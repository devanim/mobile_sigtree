import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { Button, Layout, Text } from "@ui-kitten/components";
import { ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import UserProfile from "./user-profile";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";
import { UserProfilePayload } from "../../models/user-profile/user-profile-payload";
import Error, { ErrorProps } from "../../components/error";
import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import { useKeycloak } from "../../keycloak/useKeycloak";
import React from "react";
import { TOSPayload } from "src/models/tos/tos-payload";
import { BuildingTos } from "src/models/tos/building-tos";

const UserContainer = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const { token, realm } = useKeycloak();
  const [userProfile, setUserProfile] = useState<UserProfileModel | undefined>(
    undefined
  );
  const [tos, setTos] = useState<BuildingTos[]>([]); 
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(useCallback(() => {
    setIsLoading(true);

    getUserProfileDetails();

    setIsLoading(false);
  }, []));

  useFocusEffect(useCallback(() => {
    setIsLoading(true);

    getTOS();

    setIsLoading(false);
  }, []));

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

  const getTOS = async () => {
    try {
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TOS_URL)}/all`
      const response = await axios.get<TOSPayload>(reqUrl,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status == 200) {
        setTos(response.data.data ?? []);
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
  }

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

  const navigateToTOSScreen = () => {
    navigate("TOSScreen", { screen: "TOSScreen" });
  };

  const navigateToEditUserProfileScreen = () => {
    navigate("EditUserScreen", { screen: "EditUserScreen", params: userProfile });
  };

  const navigateToChangePasswordScreen = () => {
    navigate("ChangePasswordScreen", { screen: "ChangePasswordScreen" });
  };

  const hasTosAvailable = (): boolean => {
    return tos.length > 0;
  };

  if(isLoading)
  {
    return <ActivityIndicator />
  }

  return (
    <ScrollView>
      <Layout style={styles.container} level='1'>
        <Layout level='1'>
          <UserProfile profile={userProfile} />
          <Button
            style={styles.button}
            onPress={navigateToEditUserProfileScreen}
          >{t("USER_PROFILE_EDIT").toUpperCase()}</Button>
          <Button
            style={styles.button}
            onPress={navigateToChangePasswordScreen}         
          ><Text style={{}}>{t("USER_PROFILE_CHANGE_PASSWORD").toUpperCase()}</Text></Button>
        </Layout>
        <Layout style={styles.tos} level='1'>
          {hasTosAvailable() ? (
            <Text style={styles.tosIntro}> {t("TOS_INTRO")}
              <Text
                style={styles.tosLink}
                onPress={navigateToTOSScreen}
              >{t("READ_TOS")}</Text>
            </Text>
          ) : (
            <></>
          )}
        </Layout>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tos: {
    flexDirection: 'column',
    flexGrow: 1,
    padding: '5%',
    paddingBottom: '1%',
  },
  tosLink: {
    color: '#000', 
    textDecorationLine: 'underline',
    fontWeight:'100',
    fontStyle: 'normal',
    fontFamily:'Montserrat-Regular'
  },
  tosIntro: {
    fontWeight:'100',
    fontStyle: 'normal',
    fontFamily:'Montserrat-Regular',
    textAlign: 'center'
  },
  text: {
    marginHorizontal: 8,
    textTransform: "capitalize",
  },
  button: {
    marginTop: '2%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#000',
  },
});


export default UserContainer;
