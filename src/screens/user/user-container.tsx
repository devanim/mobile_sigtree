import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ActivityIndicator, View } from "react-native";
import UserProfile from "./user-profile";
import { Button } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../routing/route-screens";
import { AUTH_MOCK, SCREEN_URL } from "../../models/mock-auth";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";
import { UserProfilePayload } from "../../models/user-profile/user-profile-payload";
import Error, { ErrorProps } from "../../components/error";
import LocalizationContext from "../../localization/localization-context";

const UserContainer = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const [userProfile, setUserProfile] = useState<UserProfileModel|undefined>(undefined);
  const [error, setError] = useState<ErrorProps|undefined>(undefined);

  useEffect(() => {
    const source = axios.CancelToken.source();
    
    getUserProfileDetails();

    return () => source.cancel("Data fetching cancelled");
  }, []);

  const getUserProfileDetails = async () => {
    try {
      const response = await axios.get<UserProfilePayload>(SCREEN_URL.USER_PROFILE_URL, { headers: { 'Authorization': `Bearer ${AUTH_MOCK.TOKEN}` } });
      
      if (response.status == 200) {
        setUserProfile(response.data.data);
      }
      else {
        const friendlyMessage = t("FAILED_REQUEST");
        setError({
          friendlyMessage: friendlyMessage,
          errorMessage: response.data.error ?? ""
        });
      }
    } catch (error) {
      const friendlyMessage = t("FAILED_REQUEST");
      setError({
        friendlyMessage: friendlyMessage,
        errorMessage: JSON.stringify(error)
      });
    }
  }

  if (error) {
    return (<Error friendlyMessage={error.friendlyMessage} errorMessage={error.errorMessage}/>)
  }

  if (!userProfile){
    return (<ActivityIndicator />);
  }


  return (
    <View>
      <Button children={"Read Tems of Services"} onPress={() => navigate("TOSScreen", { screen: "TOSScreen" })} size={'small'}/>
      <UserProfile profile={userProfile}/>
    </View>
  );
};

export default UserContainer;