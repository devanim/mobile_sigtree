import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { Button, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserProfile from "./user-profile";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";
import { UserProfilePayload } from "../../models/user-profile/user-profile-payload";
import Error, { ErrorProps } from "../../components/error";
import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import { useKeycloak } from "../../keycloak/useKeycloak";
import * as React from "react";
import { TOSPayload } from "../../models/tos/tos-payload";
import { BuildingTos } from "../../models/tos/building-tos";
import { APP_LANGUAGE_KEY } from "../../utils/constants";

const UserContainer = (): JSX.Element => {
  const { t, locale, handleChange } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const { token, realm } = useKeycloak();
  const [userProfile, setUserProfile] = useState<UserProfileModel | undefined>(
    undefined
  );
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [tosList, setTosList] = useState<BuildingTos[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      resetState();
      getUserProfileDetails();
      getTOSList();
      // changeLanguage();
      setIsLoading(false);
      console.log("Called this method", userProfile?.lang, locale);
    }, [])
  );

  const resetState = () => {
    setUserProfile(undefined);
  }

  const getUserProfileDetails = async () => {
    try {
      const response = await axios.get<UserProfilePayload>(
        SigtreeConfiguration.getUrl(realm, SCREEN_URL.USER_PROFILE_URL),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status == 200) {
        setUserProfile(response.data.data);
        changeLanguage(response.data.data.lang);
        console.log("profile details", response.data.data.lang, locale);
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

  const getTOSList = async () => {
    try {
      const reqUrl = `${SigtreeConfiguration.getUrl(
        realm,
        SCREEN_URL.TOS_URL
      )}/all`;
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

  const changeLanguage = (language: string) => {
    if (locale != language) {
      handleChange(language);
      AsyncStorage.setItem(APP_LANGUAGE_KEY, language);
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

  const navigateToTOSScreen = () => {
    navigate("TOSScreen", { screen: "TOSScreen" });
  };

  const navigateToEditUserProfileScreen = () => {
    navigate("EditUserScreen", {
      screen: "EditUserScreen",
      params: userProfile,
    });
  };

  const navigateToChangePasswordScreen = () => {
    navigate("ChangePasswordScreen", { screen: "ChangePasswordScreen" });
  };

  const hasBuildingsAssigned = (): boolean => {
    if (!userProfile) {
      return false;
    }

    return userProfile?.resources?.buildings?.length > 0;
  };

  const hasTos = (): boolean => {
    if (!tosList || tosList.length === 0) {
      return false;
    }

    return true;
  };

  if (isLoading || !userProfile) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      {!isLoading ? (
        <Layout style={styles.container} level="1">
          <Layout level="1">
            {userProfile ? <UserProfile profile={userProfile} /> : <></>}
            <Button
              style={styles.button}
              onPress={navigateToEditUserProfileScreen}
            >
              {t("USER_PROFILE_EDIT").toUpperCase()}
            </Button>
            <Button
              style={styles.button}
              onPress={navigateToChangePasswordScreen}
            >
              <Text style={{}}>
                {t("USER_PROFILE_CHANGE_PASSWORD").toUpperCase()}
              </Text>
            </Button>
          </Layout>
          <Layout style={styles.tos} level="1">
            {hasBuildingsAssigned() && hasTos() ? (
              <Text style={styles.tosIntro}>
                {" "}
                {t("TOS_INTRO")}
                <Text style={styles.tosLink} onPress={navigateToTOSScreen}>
                  {t("READ_TOS")}
                </Text>
              </Text>
            ) : (
              <></>
            )}
          </Layout>
        </Layout>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tos: {
    flexDirection: "column",
    flexGrow: 1,
    padding: '5%',
    paddingBottom: '1%',
  },
  tosLink: {
    color: "#000",
    textDecorationLine: "underline",
    fontWeight: "100",
    fontStyle: "normal",
    fontFamily: "Montserrat-Regular",
  },
  tosIntro: {
    fontWeight: "100",
    fontStyle: "normal",
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
  },
  text: {
    marginHorizontal: 8,
    textTransform: "capitalize",
  },
  button: {
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#000",
  },
});

export default UserContainer;
