import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActivityIndicator, View } from "react-native";
import UserProfile from "./user-profile";
import { Button } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../routing/route-screens";
import { AUTH_MOCK, SCREEN_URL } from "../../models/mock-auth";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";
import { UserProfilePayload } from "src/models/user-profile/user-profile-payload";

const UserContainer = (): JSX.Element => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const [userProfile, setUserProfile] = useState<UserProfileModel|undefined>(undefined);

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
        //TODO - set error state
        alert(`Error message: ${response.data.error}`);
      }
    } catch (error) {
      alert(`error: ${JSON.stringify(error)}`);
      //TODO - set error state 
    }
  }

  if (!userProfile){
    return (<ActivityIndicator />)
  }

  return (
    <View>
      <Button children={"Read Tems of Services"} onPress={() => navigate("TOSScreen", { screen: "TOSScreen" })} size={'small'}/>
      <UserProfile profile={userProfile}/>
    </View>
  );
};

export default UserContainer;