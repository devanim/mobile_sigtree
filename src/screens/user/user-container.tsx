import React, { useState } from "react";
import { View } from "react-native";
import UserProfile from "./user-profile";
import { Button } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../routing/route-screens";

const UserContainer = (): JSX.Element => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <View>
      <Button children={"Read Tems of Services"} onPress={() => navigate("TOSScreen", { screen: "TOSScreen" })} size={'small'}/>
      <UserProfile />
    </View>
  );
};

export default UserContainer;