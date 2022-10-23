import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ActivityIndicator, View } from "react-native";
import UserProfile from "./user-profile";
import { Button } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";
import { UserProfilePayload } from "../../models/user-profile/user-profile-payload";
import Error, { ErrorProps } from "../../components/error";
import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import { useKeycloak } from "../../keycloak/useKeycloak";

const UserContainer = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const { token, realm } = useKeycloak();
  const [userProfile, setUserProfile] = useState<UserProfileModel | undefined>(
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

  const navigateToTOSScreen = () => {
    navigate("TOSScreen", { screen: "TOSScreen" });
  };

  const navigateToEditUserProfileScreen = () => {
    navigate("EditUserScreen", { screen: "EditUserScreen", params: userProfile });
  };

  const navigateToChangePasswordScreen = () => {
    navigate("ChangePasswordScreen", { screen: "ChangePasswordScreen" });
  };

  const hasBuildingsAssigned = (): boolean => {
    return userProfile?.resources?.buildings?.length > 0;
  };

  return (
    <View>
      {hasBuildingsAssigned() ? (
        <Button
          children={t("READ_TOS")}
          onPress={navigateToTOSScreen}
          size={"small"}
        />
      ) : (
        <></>
      )}
      <Button
        children={t("USER_PROFILE_EDIT")}
        onPress={navigateToEditUserProfileScreen}
        size={"small"}
      />
      <Button
        children={t("USER_PROFILE_CHANGE_PASSWORD")}
        onPress={navigateToChangePasswordScreen}
        size={"small"}
      />
      <UserProfile profile={userProfile} />
    </View>
  );
};

export default UserContainer;
